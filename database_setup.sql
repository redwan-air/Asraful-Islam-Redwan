
-- ==========================================================
-- ASRAFUL ISLAM REDWAN - DATABASE ARCHITECTURE (SUPABASE)
-- REFACTORED FOR FULL AUTH AUTOMATION
-- ==========================================================

-- 1. CLEANUP (Optional: Only if you want to start fresh)
-- DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
-- DROP FUNCTION IF EXISTS public.handle_new_user();

-- 2. TABLES
-- ----------------------------------------------------------

-- Profiles (Optimized)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  custom_id TEXT UNIQUE,
  access_key TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('admin', 'user')) DEFAULT 'user',
  granted_resources TEXT[] DEFAULT '{}',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. AUTOMATION: PROFILE TRIGGER
-- ----------------------------------------------------------
-- This function runs every time a new user is created in Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
    new_custom_id TEXT;
    new_access_key TEXT;
BEGIN
    -- Generate a unique Custom ID (4 digits starting from 2000s)
    new_custom_id := (SELECT COALESCE(MAX(custom_id::int), 2000) + 1 FROM public.profiles)::text;
    
    -- Generate a unique Access Key (AIR-XXXXXX)
    new_access_key := 'AIR-' || UPPER(SUBSTRING(REPLACE(gen_random_uuid()::text, '-', ''), 1, 6));

    INSERT INTO public.profiles (id, full_name, email, custom_id, access_key, role)
    VALUES (
        new.id, 
        COALESCE(new.raw_user_meta_data->>'full_name', 'New Explorer'), 
        new.email,
        new_custom_id,
        new_access_key,
        'user'
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function after a user signs up
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 4. OTHER TABLES (Projects, Skills, Gallery, Documents)
-- [Existing table definitions remain the same as previous SQL file]
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  tags TEXT[],
  image_url TEXT,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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

-- 5. RLS POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles are viewable by owner and admin." ON public.profiles
  FOR SELECT USING (auth.uid() = id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Users can update their own profile." ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- 6. HOW TO SET ADMIN
-- Run this in your Supabase SQL Editor after you sign up:
-- UPDATE public.profiles SET role = 'admin', access_key = 'MASTER_KEY' WHERE email = 'your-email@example.com';
