-- ==========================================================
-- ASRAFUL ISLAM REDWAN - DATABASE ARCHITECTURE (SUPABASE)
-- ==========================================================

-- 1. CORE SYSTEM: PROFILES & ACCESS CONTROL
-- ----------------------------------------------------------

-- Create a custom sequence for User IDs (starting at 2002 as requested)
CREATE SEQUENCE IF NOT EXISTS public.custom_id_seq START 2002;

-- Profiles table: Extends Supabase Auth users
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

-- Ensure RLS is enabled for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile." ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- 2. CONTENT TABLES: PROJECTS, SKILLS, GALLERY, DOCUMENTS
-- ----------------------------------------------------------

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

-- Gallery (Visual Assets)
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

-- Documents (Repository)
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

-- Enable RLS on all content tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Content Policies (Public access for public items, admin access for all)
CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public read skills" ON public.skills FOR SELECT USING (true);

CREATE POLICY "Gallery access policy" ON public.gallery FOR SELECT USING (
  visibility = 'public' OR 
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "Document access policy" ON public.documents FOR SELECT USING (
  visibility = 'public' OR 
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- 3. INITIAL SEED DATA (CONTENT)
-- ----------------------------------------------------------

-- Seed Projects
INSERT INTO public.projects (title, description, tags, image_url) VALUES 
('AlgoFlow Visualizer', 'A high-performance algorithm simulation engine.', ARRAY['C++', 'Algorithms', 'Logic'], 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'),
('Codeforces Analytics', 'Analyzing competitive programming trajectories.', ARRAY['C++', 'Data Structures'], 'https://images.unsplash.com/photo-1551288049-bbbda536639a?auto=format&fit=crop&w=800&q=80');

-- Seed Skills
INSERT INTO public.skills (name, icon, category, sort_order) VALUES 
('C++', '🚀', 'backend', 1),
('Algorithms', '🧠', 'other', 2),
('Graph Theory', '🕸️', 'other', 3),
('Problem Solving', '🧩', 'other', 4),
('Data Structures', '📊', 'other', 5);

-- Seed Gallery
INSERT INTO public.gallery (id, title, description, date_time, label, image_url, visibility) VALUES 
('g-logo', 'Official Logo', 'The official identity logo of Asraful Islam Redwan', '2026-02-02 17:52', 'Official', 'https://i.postimg.cc/HkYKGYnb/logo.png', 'public'),
('g-private-1', 'Unreleased Blueprint', 'Confidential architectural drawing.', '2026-02-05 10:00', 'Official', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80', 'private');

-- 4. IDENTITY SEEDING (MANUAL STEP)
-- ----------------------------------------------------------

-- IMPORTANT: You must sign up these users via the website UI first to get their UUIDs.
-- Once signed up, find their 'id' in the 'auth.users' table and run these updates:

-- [ADMIN] PROMOTE REDWAN
-- UPDATE public.profiles 
-- SET role = 'admin', custom_id = '1001', access_key = 'MASTER_KEY', full_name = 'Asraful Islam Redwan'
-- WHERE id = 'PASTE_ACTUAL_UUID_HERE';

-- [USER] CONFIGURE DEFAULT USER 2216
-- UPDATE public.profiles 
-- SET custom_id = '2216', access_key = 'AIR-2216-KEY', full_name = 'Default User'
-- WHERE id = 'PASTE_ACTUAL_UUID_HERE';

-- Force PostgREST to reload schema
NOTIFY pgrst, 'reload schema';
