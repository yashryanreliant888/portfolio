-- Gallery table for storing image gallery items
-- Run this SQL in your Supabase SQL Editor to create the table

CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_path TEXT NOT NULL,
  date DATE,
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create an index on sort_order for efficient ordering
CREATE INDEX IF NOT EXISTS idx_gallery_sort_order ON gallery(sort_order);

-- Create an index on is_published for filtering
CREATE INDEX IF NOT EXISTS idx_gallery_is_published ON gallery(is_published);

-- Create an index on date for chronological queries
CREATE INDEX IF NOT EXISTS idx_gallery_date ON gallery(date DESC);

-- Add RLS (Row Level Security) policies
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view published gallery items
CREATE POLICY "Public gallery items are viewable by everyone" 
  ON gallery FOR SELECT 
  USING (is_published = true);

-- Policy: Authenticated admin users can view all gallery items
CREATE POLICY "Admins can view all gallery items" 
  ON gallery FOR SELECT 
  USING (
    auth.role() = 'authenticated' 
    AND EXISTS (
      SELECT 1 FROM admin_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('admin', 'editor')
    )
  );

-- Policy: Authenticated admin users can insert gallery items
CREATE POLICY "Admins can insert gallery items" 
  ON gallery FOR INSERT 
  WITH CHECK (
    auth.role() = 'authenticated' 
    AND EXISTS (
      SELECT 1 FROM admin_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('admin', 'editor')
    )
  );

-- Policy: Authenticated admin users can update gallery items
CREATE POLICY "Admins can update gallery items" 
  ON gallery FOR UPDATE 
  USING (
    auth.role() = 'authenticated' 
    AND EXISTS (
      SELECT 1 FROM admin_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('admin', 'editor')
    )
  );

-- Policy: Authenticated admin users can delete gallery items
CREATE POLICY "Admins can delete gallery items" 
  ON gallery FOR DELETE 
  USING (
    auth.role() = 'authenticated' 
    AND EXISTS (
      SELECT 1 FROM admin_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('admin', 'editor')
    )
  );

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_gallery_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to call the function
CREATE TRIGGER update_gallery_updated_at_trigger
  BEFORE UPDATE ON gallery
  FOR EACH ROW
  EXECUTE FUNCTION update_gallery_updated_at();

-- Storage bucket for gallery images (run after creating the table)
-- You'll need to create this bucket in Supabase Storage UI or via SQL:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true);

-- Storage policies for gallery bucket
-- CREATE POLICY "Public gallery images are publicly accessible" 
--   ON storage.objects FOR SELECT 
--   USING (bucket_id = 'gallery');

-- CREATE POLICY "Admins can upload gallery images" 
--   ON storage.objects FOR INSERT 
--   WITH CHECK (
--     bucket_id = 'gallery' 
--     AND auth.role() = 'authenticated'
--     AND EXISTS (
--       SELECT 1 FROM admin_roles 
--       WHERE user_id = auth.uid() 
--       AND role IN ('admin', 'editor')
--     )
--   );

-- CREATE POLICY "Admins can update gallery images" 
--   ON storage.objects FOR UPDATE 
--   USING (
--     bucket_id = 'gallery' 
--     AND auth.role() = 'authenticated'
--     AND EXISTS (
--       SELECT 1 FROM admin_roles 
--       WHERE user_id = auth.uid() 
--       AND role IN ('admin', 'editor')
--     )
--   );

-- CREATE POLICY "Admins can delete gallery images" 
--   ON storage.objects FOR DELETE 
--   USING (
--     bucket_id = 'gallery' 
--     AND auth.role() = 'authenticated'
--     AND EXISTS (
--       SELECT 1 FROM admin_roles 
--       WHERE user_id = auth.uid() 
--       AND role IN ('admin', 'editor')
--     )
--   );
