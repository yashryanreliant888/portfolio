-- ================================================
-- ENHANCED CERTIFICATIONS SCHEMA
-- Migration to support rich certification data with all fields from JSON
-- ================================================

-- Drop the existing certifications table and recreate with enhanced schema
DROP TABLE IF EXISTS certifications CASCADE;

CREATE TABLE certifications (
  -- Primary identifiers
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cert_id TEXT UNIQUE NOT NULL, -- The custom ID from JSON (e.g., "guvi-claude-ai-productivity")
  
  -- Core information
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  recipient_name TEXT NOT NULL,
  category TEXT,
  summary TEXT,
  
  -- Skills and metadata
  skills_covered TEXT[] DEFAULT '{}',
  issuer_partners_shown TEXT[] DEFAULT '{}',
  issuing_organizations_shown TEXT[] DEFAULT '{}',
  
  -- Dates
  issue_date DATE,
  expiry_date DATE,
  valid_from DATE,
  completion_date DATE,
  
  -- Credentials and verification
  credential_id TEXT,
  exam_id TEXT,
  verification_url TEXT,
  verification_status TEXT DEFAULT 'not_independently_verified' 
    CHECK (verification_status IN ('verified', 'not_independently_verified', 'expired', 'revoked')),
  qr_code_present BOOLEAN DEFAULT FALSE,
  
  -- File management
  source_file TEXT, -- Original filename for reference
  public_path TEXT NOT NULL, -- Public URL path for the certificate file
  file_type TEXT NOT NULL, -- MIME type (image/png, application/pdf, etc.)
  
  -- Display and publishing
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_certifications_cert_id ON certifications(cert_id);
CREATE INDEX idx_certifications_published ON certifications(is_published);
CREATE INDEX idx_certifications_category ON certifications(category);
CREATE INDEX idx_certifications_display_order ON certifications(display_order);
CREATE INDEX idx_certifications_issue_date ON certifications(issue_date DESC NULLS LAST);
CREATE INDEX idx_certifications_expiry_date ON certifications(expiry_date);

-- ================================================
-- ROW LEVEL SECURITY
-- ================================================
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

-- Public can view published certifications
DROP POLICY IF EXISTS "Published certifications are viewable by everyone" ON certifications;
CREATE POLICY "Published certifications are viewable by everyone"
  ON certifications FOR SELECT
  USING (is_published = true);

-- Admins can do everything with certifications
DROP POLICY IF EXISTS "Admins can manage certifications" ON certifications;
CREATE POLICY "Admins can manage certifications"
  ON certifications FOR ALL
  USING (is_admin());

-- ================================================
-- TRIGGER FOR AUTO-UPDATE TIMESTAMP
-- ================================================
DROP TRIGGER IF EXISTS update_certifications_updated_at ON certifications;
CREATE TRIGGER update_certifications_updated_at
  BEFORE UPDATE ON certifications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ================================================
-- HELPER VIEW: Active Certifications with Expiry Status
-- ================================================
CREATE OR REPLACE VIEW certifications_with_status AS
SELECT 
  *,
  CASE 
    WHEN expiry_date IS NULL THEN 'valid'
    WHEN expiry_date < CURRENT_DATE THEN 'expired'
    ELSE 'valid'
  END AS current_status
FROM certifications
WHERE is_published = true
ORDER BY display_order, issue_date DESC NULLS LAST;

-- Grant public read access to the view
GRANT SELECT ON certifications_with_status TO anon, authenticated;

-- ================================================
-- COMMENTS FOR DOCUMENTATION
-- ================================================
COMMENT ON TABLE certifications IS 'Stores professional certifications with rich metadata including verification, skills, and file management';
COMMENT ON COLUMN certifications.cert_id IS 'Human-readable unique identifier for the certification';
COMMENT ON COLUMN certifications.skills_covered IS 'Array of skills learned or demonstrated by this certification';
COMMENT ON COLUMN certifications.verification_status IS 'Whether the certification has been independently verified';
COMMENT ON COLUMN certifications.public_path IS 'Public URL path where the certificate file is accessible';
COMMENT ON COLUMN certifications.source_file IS 'Original source filename for traceability';
