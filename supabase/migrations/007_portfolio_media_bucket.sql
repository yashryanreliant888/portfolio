INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio-media',
  'portfolio-media',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "Public can view media files" ON storage.objects;
CREATE POLICY "Public can view media files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-media');

DROP POLICY IF EXISTS "Admins can upload media files" ON storage.objects;
CREATE POLICY "Admins can upload media files"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'portfolio-media' AND public.is_admin());

DROP POLICY IF EXISTS "Admins can update media files" ON storage.objects;
CREATE POLICY "Admins can update media files"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'portfolio-media' AND public.is_admin())
  WITH CHECK (bucket_id = 'portfolio-media' AND public.is_admin());

DROP POLICY IF EXISTS "Admins can delete media files" ON storage.objects;
CREATE POLICY "Admins can delete media files"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'portfolio-media' AND public.is_admin());
