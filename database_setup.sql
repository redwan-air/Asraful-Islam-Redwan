-- ==========================================================
-- ASRAFUL ISLAM REDWAN - DATABASE ARCHITECTURE (SUPABASE)
-- IDEMPOTENT SETUP SCRIPT
-- ==========================================================

-- 1. SEQUENCES
-- ----------------------------------------------------------
CREATE SEQUENCE IF NOT EXISTS public.custom_id_seq START 2002;

-- 2. TABLES
-- ----------------------------------------------------------

-- Profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  full_name TEXT,
  custom_id TEXT UNIQUE DEFAULT nextval('public.custom_id_seq')::TEXT,
  access_key TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('admin', 'user')) DEFAULT 'user',
  granted_resources TEXT[] DEFAULT '{}',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Projects
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  tags TEXT[],
  image_url TEXT,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skills
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT,
  category TEXT CHECK (category IN ('frontend', 'backend', 'tools', 'other')),
  sort_order INTEGER DEFAULT 0
);

-- Gallery
CREATE TABLE IF NOT EXISTS public.gallery (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date_time TEXT,
  label TEXT CHECK (label IN ('Official', 'Unofficial')),
  image_url TEXT NOT NULL,
  visibility TEXT CHECK (visibility IN ('public', 'private')) DEFAULT 'public',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Documents
CREATE TABLE IF NOT EXISTS public.documents (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date_time TEXT,
  labels TEXT[],
  file_url TEXT NOT NULL,
  file_type TEXT,
  visibility TEXT CHECK (visibility IN ('public', 'private')) DEFAULT 'public',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. ROW LEVEL SECURITY (RLS)
-- ----------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- 4. POLICIES (DROP IF EXISTS THEN CREATE)
-- ----------------------------------------------------------

-- Profiles
DO $$ BEGIN
    DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
    CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
    
    DROP POLICY IF EXISTS "Users can update own profile." ON public.profiles;
    CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);
END $$;

-- Projects
DO $$ BEGIN
    DROP POLICY IF EXISTS "Public read projects" ON public.projects;
    CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);
END $$;

-- Skills
DO $$ BEGIN
    DROP POLICY IF EXISTS "Public read skills" ON public.skills;
    CREATE POLICY "Public read skills" ON public.skills FOR SELECT USING (true);
END $$;

-- Gallery
DO $$ BEGIN
    DROP POLICY IF EXISTS "Gallery access policy" ON public.gallery;
    CREATE POLICY "Gallery access policy" ON public.gallery FOR SELECT USING (
      visibility = 'public' OR 
      (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
    );
END $$;

-- Documents
DO $$ BEGIN
    DROP POLICY IF EXISTS "Document access policy" ON public.documents;
    CREATE POLICY "Document access policy" ON public.documents FOR SELECT USING (
      visibility = 'public' OR 
      (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
    );
END $$;

-- 5. SEED DATA (CONTENT)
-- ----------------------------------------------------------

-- Projects (Using ON CONFLICT to avoid errors on re-run)
INSERT INTO public.projects (title, description, tags, image_url)
VALUES 
('AlgoFlow Visualizer', 'A high-performance algorithm simulation engine.', ARRAY['C++', 'Algorithms', 'Logic'], 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'),
('Codeforces Analytics', 'Analyzing competitive programming trajectories.', ARRAY['C++', 'Data Structures'], 'https://images.unsplash.com/photo-1551288049-bbbda536639a?auto=format&fit=crop&w=800&q=80')
ON CONFLICT DO NOTHING;

-- Skills
INSERT INTO public.skills (name, icon, category, sort_order)
VALUES 
('C++', '🚀', 'backend', 1),
('Algorithms', '🧠', 'other', 2),
('Graph Theory', '🕸️', 'other', 3),
('Problem Solving', '🧩', 'other', 4),
('Data Structures', '📊', 'other', 5)
ON CONFLICT DO NOTHING;

-- Gallery
INSERT INTO public.gallery (id, title, description, date_time, label, image_url, visibility)
VALUES 
('g-logo', 'Official Logo', 'The official identity logo of Asraful Islam Redwan', '2026-02-02 17:52', 'Official', 'https://i.postimg.cc/HkYKGYnb/logo.png', 'public')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;

-- 6. IDENTITY SETUP NOTES
-- ----------------------------------------------------------
-- Step 1: Sign up through the website.
-- Step 2: Go to Supabase SQL Editor and find the user's UUID in auth.users.
-- Step 3: Run the relevant query below:

-- FOR ADMIN (REDWAN):
-- UPDATE public.profiles SET role = 'admin', custom_id = '1001', access_key = 'MASTER_KEY' WHERE id = 'PASTE_UUID_HERE';

-- FOR USER (UID 2216):
-- UPDATE public.profiles SET custom_id = '2216', access_key = 'AIR-2216-KEY' WHERE id = 'PASTE_UUID_HERE';

NOTIFY pgrst, 'reload schema';