
-- ASRAFUL ISLAM REDWAN - DEFINITIVE DATABASE FIX
-- RUN THIS IN SUPABASE SQL EDITOR TO FIX "DATABASE ERROR SAVING NEW USER"

-- 1. CLEANUP PREVIOUS ATTEMPTS
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 2. ENSURE ALL COLUMNS EXIST IN THE TABLE
-- The previous error happened because these columns were missing in your existing table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- 3. CREATE A ROBUST TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, custom_id, access_key, role)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data->>'full_name', 'Explorer'), 
    new.email,
    'ID-' || floor(random() * 89999 + 10000)::text,
    'AIR-' || upper(substr(md5(random()::text), 1, 6)),
    'user'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. RE-ENABLE THE TRIGGER
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 5. RLS UPDATES (Making sure everyone can read public profiles)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read access" ON public.profiles;
CREATE POLICY "Public read access" ON public.profiles 
FOR SELECT USING (true);
