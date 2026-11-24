-- Normalize certificate file_type values to user-facing file extensions.
UPDATE certifications
SET file_type = CASE
  WHEN LOWER(COALESCE(public_path, '')) LIKE '%.pdf%' THEN 'pdf'
  WHEN LOWER(COALESCE(public_path, '')) LIKE '%.png%' THEN 'png'
  WHEN LOWER(COALESCE(public_path, '')) LIKE '%.jpeg%' THEN 'jpeg'
  WHEN LOWER(COALESCE(public_path, '')) LIKE '%.jpg%' THEN 'jpg'
  WHEN LOWER(COALESCE(public_path, '')) LIKE '%.webp%' THEN 'webp'
  WHEN LOWER(file_type) = 'application/pdf' THEN 'pdf'
  WHEN LOWER(file_type) = 'image/png' THEN 'png'
  WHEN LOWER(file_type) = 'image/webp' THEN 'webp'
  WHEN LOWER(file_type) LIKE 'image/jpeg%' THEN 'jpg'
  ELSE LOWER(file_type)
END
WHERE file_type IS NOT NULL;

COMMENT ON COLUMN certifications.file_type IS 'Certificate file extension: pdf, png, jpeg, jpg, or webp.';
