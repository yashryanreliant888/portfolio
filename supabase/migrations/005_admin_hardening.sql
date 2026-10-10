-- ================================================
-- ADMIN HARDENING
-- Tightens is_admin() function and admin_roles policies.
-- All statements are idempotent (DROP IF EXISTS / CREATE OR REPLACE).
-- ================================================

-- Replace is_admin() with a hardened version
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

-- Recreate admin_roles policies safely
DROP POLICY IF EXISTS "Admins can view admin roles" ON public.admin_roles;
CREATE POLICY "Admins can view admin roles"
  ON public.admin_roles FOR SELECT
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can manage admin roles" ON public.admin_roles;
CREATE POLICY "Admins can manage admin roles"
  ON public.admin_roles FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Ensure RLS is enabled
ALTER TABLE public.admin_roles ENABLE ROW LEVEL SECURITY;
