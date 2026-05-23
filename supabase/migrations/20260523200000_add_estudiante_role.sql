-- Rol estudiante: jóvenes que quieren aprender y ser más competentes en el mundo laboral

ALTER TYPE public.user_role ADD VALUE IF NOT EXISTS 'estudiante';

CREATE TABLE IF NOT EXISTS public.student_profiles (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  career_goal TEXT,
  target_skills TEXT[],
  education_level TEXT,
  city TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY student_select_own_or_admin
  ON public.student_profiles FOR SELECT
  USING ((auth.uid() = id) OR is_admin());

CREATE POLICY student_insert_own
  ON public.student_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY student_update_own
  ON public.student_profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  requested_role TEXT;
  final_role public.user_role;
BEGIN
  requested_role := COALESCE(NEW.raw_user_meta_data->>'role', 'emprendedor');

  IF requested_role = 'mentor' THEN
    final_role := 'mentor';
  ELSIF requested_role = 'estudiante' THEN
    final_role := 'estudiante';
  ELSE
    final_role := 'emprendedor';
  END IF;

  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    final_role
  );

  IF final_role = 'emprendedor' THEN
    INSERT INTO public.entrepreneur_profiles (id) VALUES (NEW.id);
  ELSIF final_role = 'mentor' THEN
    INSERT INTO public.mentor_profiles (id) VALUES (NEW.id);
  ELSIF final_role = 'estudiante' THEN
    INSERT INTO public.student_profiles (id) VALUES (NEW.id);
  END IF;

  RETURN NEW;
END;
$function$;
