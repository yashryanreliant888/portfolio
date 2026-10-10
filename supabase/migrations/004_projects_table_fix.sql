-- ================================================
-- PROJECTS TABLE SAFE GUARDS
-- This migration ensures the projects table, policies,
-- and trigger exist. Everything is wrapped in IF NOT EXISTS
-- / DROP IF EXISTS guards so it is safe to run even when
-- 001_initial_schema.sql already created them.
-- ================================================

-- Table (already created by 001, but safe to repeat)
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT,
  summary TEXT,
  objectives TEXT,
  target_audience TEXT,
  strategy TEXT,
  channels JSONB DEFAULT '[]'::jsonb,
  tools JSONB DEFAULT '[]'::jsonb,
  deliverables JSONB DEFAULT '[]'::jsonb,
  results JSONB DEFAULT '[]'::jsonb,
  cover_image_path TEXT,
  gallery JSONB DEFAULT '[]'::jsonb,
  external_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(is_published, is_featured, sort_order);

-- RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policies — drop first so re-running never errors
DROP POLICY IF EXISTS "Public can view published projects" ON projects;
CREATE POLICY "Public can view published projects"
  ON projects FOR SELECT
  USING (is_published = true);

DROP POLICY IF EXISTS "Admins can manage projects" ON projects;
CREATE POLICY "Admins can manage projects"
  ON projects FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_roles
      WHERE admin_roles.user_id = auth.uid()
        AND admin_roles.role = 'admin'
    )
  );

-- Trigger function (CREATE OR REPLACE is always safe)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger — drop first so re-running never errors
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
