-- ================================================
-- GALLERY SEED DATA
-- Populated from Gallery folder
-- ================================================

-- Clear existing gallery items (use with caution in production)
TRUNCATE TABLE gallery CASCADE;

INSERT INTO gallery (
  title,
  description,
  image_path,
  date,
  display_order,
  is_published
) VALUES
(
  'Gallery Item 1',
  'Professional work sample or portfolio piece',
  '/Gallery/gallery1.jpg',
  CURRENT_DATE,
  1,
  true
);

-- Add more gallery items as needed
-- Example format:
-- (
--   'Gallery Item 2',
--   'Description of the image',
--   '/Gallery/image2.jpg',
--   '2024-01-15',
--   2,
--   true
-- );

-- Verification
DO $$
DECLARE
  gallery_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO gallery_count FROM gallery;
  RAISE NOTICE 'Successfully seeded % gallery items', gallery_count;
END $$;
