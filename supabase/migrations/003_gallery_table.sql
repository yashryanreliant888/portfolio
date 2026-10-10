-- ================================================
-- GALLERY TABLE
-- Migration to add gallery functionality
-- ================================================

CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image_path TEXT NOT NULL,
  date DATE,
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_gallery_display_order ON gallery(display_order);
CREATE INDEX IF NOT EXISTS idx_gallery_is_published ON gallery(is_published);
CREATE INDEX IF NOT EXISTS idx_gallery_date ON gallery(date DESC NULLS LAST);

-- ================================================
-- ROW LEVEL SECURITY
-- ================================================
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Public can view published gallery items
CREATE POLICY "Published gallery items are viewable by everyone"
  ON gallery FOR SELECT
  USING (is_published = true);

-- Admins can do everything
CREATE POLICY "Admins can manage gallery"
  ON gallery FOR ALL
  USING (is_admin());

-- ================================================
-- TRIGGER FOR AUTO-UPDATE TIMESTAMP
-- ================================================
CREATE TRIGGER update_gallery_updated_at
  BEFORE UPDATE ON gallery
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ================================================
-- COMMENTS FOR DOCUMENTATION
-- ================================================
COMMENT ON TABLE gallery IS 'Stores gallery images for the portfolio';
COMMENT ON COLUMN gallery.image_path IS 'Public path to the gallery image';
COMMENT ON COLUMN gallery.display_order IS 'Sort order for display';
