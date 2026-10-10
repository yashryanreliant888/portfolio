-- Seed data for gallery table
-- Run this after creating the gallery table and uploading images to Supabase Storage

-- First, ensure you have uploaded gallery1.jpg to the 'gallery' storage bucket in Supabase
-- The image_path should be the public URL or storage path

INSERT INTO gallery (title, description, image_path, date, sort_order, is_published) VALUES
  (
    'Gallery Image 1',
    'A beautiful moment captured in time',
    '/Gallery/gallery1.jpg',
    '2024-01-15',
    1,
    true
  );

-- Add more gallery items as needed
-- Example additional entries:

-- INSERT INTO gallery (title, description, image_path, date, sort_order, is_published) VALUES
--   (
--     'Professional Headshot',
--     'Corporate photography session',
--     '/Gallery/gallery2.jpg',
--     '2024-02-20',
--     2,
--     true
--   ),
--   (
--     'Event Photography',
--     'Industry conference 2024',
--     '/Gallery/gallery3.jpg',
--     '2024-03-10',
--     3,
--     true
--   );

-- To get the public URL for images stored in Supabase Storage, use:
-- https://[YOUR_PROJECT_ID].supabase.co/storage/v1/object/public/gallery/[filename]

-- Or if you prefer to keep images in the /public folder:
-- Use paths like: '/Gallery/gallery1.jpg'
