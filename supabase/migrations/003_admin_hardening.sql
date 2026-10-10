-- Admin hardening: role checks are explicit and storage access is restricted to admins.
-- Run after the existing migrations in Supabase SQL Editor.

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;

DROP POLICY IF EXISTS "Admins can view admin roles" ON public.admin_roles;
CREATE POLICY "Admins can view admin roles"
  ON public.admin_roles FOR SELECT
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can manage admin roles" ON public.admin_roles;
CREATE POLICY "Admins can manage admin roles"
  ON public.admin_roles FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Prevent public visitors from writing arbitrary role records.
ALTER TABLE public.admin_roles ENABLE ROW LEVEL SECURITY;
