INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio-certificates',
  'portfolio-certificates',
  true,
  10485760,
  ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "Public can view certificate files" ON storage.objects;
CREATE POLICY "Public can view certificate files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-certificates');

DROP POLICY IF EXISTS "Admins can upload certificate files" ON storage.objects;
CREATE POLICY "Admins can upload certificate files"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'portfolio-certificates' AND public.is_admin());

DROP POLICY IF EXISTS "Admins can update certificate files" ON storage.objects;
CREATE POLICY "Admins can update certificate files"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'portfolio-certificates' AND public.is_admin())
  WITH CHECK (bucket_id = 'portfolio-certificates' AND public.is_admin());
