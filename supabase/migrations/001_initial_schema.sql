-- uuid-ossp not required; using gen_random_uuid() which is built into PostgreSQL 13+

-- ================================================
-- PROFILES TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  headline TEXT,
  email TEXT,
  location TEXT,
  biography TEXT,
  profile_image_path TEXT,
  resume_file_path TEXT,
  linkedin_url TEXT,
  instagram_url TEXT,
  website_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create single profile record
INSERT INTO profiles (full_name, headline, email, location)
VALUES (
  'Yash Ryan Reliant',
  'Digital Marketing Specialist',
  'yashryanreliant@gmail.com',
  'Kerala, India'
) ON CONFLICT DO NOTHING;

-- ================================================
-- SKILLS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  proficiency TEXT,
  icon TEXT,
  external_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_skills_active ON skills(is_active);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);

-- ================================================
-- EXPERIENCE TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization TEXT NOT NULL,
  role TEXT NOT NULL,
  employment_type TEXT,
  start_date DATE,
  end_date DATE,
  duration_label TEXT,
  description TEXT,
  responsibilities JSONB DEFAULT '[]'::jsonb,
  organization_logo_path TEXT,
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_experience_published ON experience(is_published);

-- ================================================
-- CERTIFICATIONS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  category TEXT,
  description TEXT,
  issue_date DATE,
  expiry_date DATE,
  credential_id TEXT,
  credential_url TEXT,
  certificate_file_path TEXT,
  verification_status TEXT DEFAULT 'unverified' CHECK (verification_status IN ('unverified', 'verified', 'expired')),
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_certifications_published ON certifications(is_published);

-- ================================================
-- EDUCATION TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  qualification TEXT NOT NULL,
  institution TEXT NOT NULL,
  field_of_study TEXT,
  study_start DATE,
  study_end DATE,
  status TEXT,
  grade TEXT,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_education_published ON education(is_published);

-- ================================================
-- PROJECTS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
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
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(is_published);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);

-- ================================================
-- CONTACT SUBMISSIONS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_submissions(created_at DESC);

-- ================================================
-- ADMIN ROLES TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS admin_roles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================
-- ENABLE ROW LEVEL SECURITY
-- ================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;

-- ================================================
-- HELPER FUNCTION: Check if user is admin
-- ================================================
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ================================================
-- RLS POLICIES: PROFILES
-- ================================================
-- Public can read profile
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

-- Only admins can update
CREATE POLICY "Admins can update profile"
  ON profiles FOR UPDATE
  USING (is_admin());

-- ================================================
-- RLS POLICIES: SKILLS
-- ================================================
-- Public can view active skills
CREATE POLICY "Active skills are viewable by everyone"
  ON skills FOR SELECT
  USING (is_active = true);

-- Admins can do everything
CREATE POLICY "Admins can manage skills"
  ON skills FOR ALL
  USING (is_admin());

-- ================================================
-- RLS POLICIES: EXPERIENCE
-- ================================================
-- Public can view published experience
CREATE POLICY "Published experience is viewable by everyone"
  ON experience FOR SELECT
  USING (is_published = true);

-- Admins can do everything
CREATE POLICY "Admins can manage experience"
  ON experience FOR ALL
  USING (is_admin());

-- ================================================
-- RLS POLICIES: CERTIFICATIONS
-- ================================================
-- Public can view published certifications
CREATE POLICY "Published certifications are viewable by everyone"
  ON certifications FOR SELECT
  USING (is_published = true);

-- Admins can do everything
CREATE POLICY "Admins can manage certifications"
  ON certifications FOR ALL
  USING (is_admin());

-- ================================================
-- RLS POLICIES: EDUCATION
-- ================================================
-- Public can view published education
CREATE POLICY "Published education is viewable by everyone"
  ON education FOR SELECT
  USING (is_published = true);

-- Admins can do everything
CREATE POLICY "Admins can manage education"
  ON education FOR ALL
  USING (is_admin());

-- ================================================
-- RLS POLICIES: PROJECTS
-- ================================================
-- Public can view published projects
CREATE POLICY "Published projects are viewable by everyone"
  ON projects FOR SELECT
  USING (is_published = true);

-- Admins can do everything
CREATE POLICY "Admins can manage projects"
  ON projects FOR ALL
  USING (is_admin());

-- ================================================
-- RLS POLICIES: CONTACT SUBMISSIONS
-- ================================================
-- Public can insert (submit form)
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

-- Only admins can view submissions
CREATE POLICY "Admins can view submissions"
  ON contact_submissions FOR SELECT
  USING (is_admin());

-- Only admins can update status
CREATE POLICY "Admins can update submissions"
  ON contact_submissions FOR UPDATE
  USING (is_admin());

-- Only admins can delete
CREATE POLICY "Admins can delete submissions"
  ON contact_submissions FOR DELETE
  USING (is_admin());

-- ================================================
-- RLS POLICIES: ADMIN ROLES
-- ================================================
-- Only admins can view admin roles
CREATE POLICY "Admins can view admin roles"
  ON admin_roles FOR SELECT
  USING (is_admin());

-- ================================================
-- FUNCTIONS: Auto-update timestamps
-- ================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at
  BEFORE UPDATE ON skills
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experience_updated_at
  BEFORE UPDATE ON experience
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certifications_updated_at
  BEFORE UPDATE ON certifications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_education_updated_at
  BEFORE UPDATE ON education
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
