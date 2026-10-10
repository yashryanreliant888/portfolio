-- ================================================
-- STORAGE BUCKETS SETUP
-- Run this in Supabase SQL Editor
-- ================================================

-- Note: Buckets must be created via Supabase Dashboard or CLI
-- This file documents the required configuration

/*
BUCKET: portfolio-media
- Purpose: Profile photos, project thumbnails, campaign images
- Public: true (files are publicly accessible)
- File size limit: 5MB
- Allowed MIME types: image/jpeg, image/png, image/webp, image/gif

BUCKET: portfolio-certificates
- Purpose: Certificate images and PDFs
- Public: true (published certificates are public)
- File size limit: 10MB
- Allowed MIME types: image/jpeg, image/png, application/pdf

BUCKET: portfolio-documents
- Purpose: Resume files and private documents
- Public: false (require signed URLs)
- File size limit: 10MB
- Allowed MIME types: application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document
*/

-- ================================================
-- STORAGE POLICIES: portfolio-media
-- ================================================

-- Public can view files
CREATE POLICY "Public can view media files"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-media');

-- Only admins can upload
CREATE POLICY "Admins can upload media files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'portfolio-media' AND
  EXISTS (SELECT 1 FROM admin_roles WHERE user_id = auth.uid() AND role = 'admin')
);

-- Only admins can delete
CREATE POLICY "Admins can delete media files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'portfolio-media' AND
  EXISTS (SELECT 1 FROM admin_roles WHERE user_id = auth.uid() AND role = 'admin')
);

-- ================================================
-- STORAGE POLICIES: portfolio-certificates
-- ================================================

-- Public can view certificates
CREATE POLICY "Public can view certificate files"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-certificates');

-- Only admins can upload
CREATE POLICY "Admins can upload certificate files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'portfolio-certificates' AND
  EXISTS (SELECT 1 FROM admin_roles WHERE user_id = auth.uid() AND role = 'admin')
);

-- Only admins can delete
CREATE POLICY "Admins can delete certificate files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'portfolio-certificates' AND
  EXISTS (SELECT 1 FROM admin_roles WHERE user_id = auth.uid() AND role = 'admin')
);

-- ================================================
-- STORAGE POLICIES: portfolio-documents
-- ================================================

-- Only admins can view private documents
CREATE POLICY "Admins can view private documents"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'portfolio-documents' AND
  EXISTS (SELECT 1 FROM admin_roles WHERE user_id = auth.uid() AND role = 'admin')
);

-- Only admins can upload
CREATE POLICY "Admins can upload private documents"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'portfolio-documents' AND
  EXISTS (SELECT 1 FROM admin_roles WHERE user_id = auth.uid() AND role = 'admin')
);

-- Only admins can delete
CREATE POLICY "Admins can delete private documents"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'portfolio-documents' AND
  EXISTS (SELECT 1 FROM admin_roles WHERE user_id = auth.uid() AND role = 'admin')
);
