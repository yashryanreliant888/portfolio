-- ================================================
-- SEED SCRIPT: Initial Portfolio Data
-- Idempotent: Can be run multiple times safely
-- Run order: This file runs first, then files in seeds/ folder
-- ================================================

-- ================================================
-- SKILLS DATA
-- ================================================
INSERT INTO skills (name, category, is_active, sort_order)
VALUES
  ('Google Analytics', 'Analytics', true, 1),
  ('Google Search Console', 'SEO', true, 2),
  ('SEMrush', 'SEO', true, 3),
  ('HubSpot', 'CRM and Marketing Automation', true, 4),
  ('Mailchimp', 'Email Marketing', true, 5),
  ('Google Ads', 'Paid Advertising', true, 6),
  ('Meta Ads', 'Paid Advertising', true, 7),
  ('Canva Pro', 'Design and Content', true, 8),
  ('CapCut', 'Video Editing', true, 9),
  ('Power BI', 'Data Analytics', true, 10),
  ('Microsoft Excel', 'Productivity and Analytics', true, 11),
  ('Microsoft Word', 'Productivity', true, 12),
  ('WordPress', 'Website Management', true, 13),
  ('Elementor', 'Website Design', true, 14)
ON CONFLICT DO NOTHING;

-- ================================================
-- CERTIFICATIONS DATA
-- Note: Enhanced certifications are seeded from certifications_seed.sql
-- Run that file separately for the full certification data
-- ================================================
-- This section is now handled by seeds/certifications_seed.sql

-- ================================================
-- EDUCATION DATA
-- ================================================
INSERT INTO education (qualification, institution, status, is_published, sort_order)
VALUES
  (
    'B.Com in Cooperation',
    'SN Open University',
    'not_specified',
    true,
    1
  )
ON CONFLICT DO NOTHING;

-- ================================================
-- EXPERIENCE DATA
-- ================================================
INSERT INTO experience (organization, role, employment_type, duration_label, description, is_published, sort_order)
VALUES
  (
    'Team YNES',
    'Intern',
    'Internship',
    '1 month',
    'One-month internship experience.',
    true,
    1
  ),
  (
    'IPCS Global',
    'Intern',
    'Internship',
    '1 week',
    'One-week internship experience.',
    true,
    2
  )
ON CONFLICT DO NOTHING;

-- ================================================
-- UPDATE PROFILE (if exists)
-- ================================================
UPDATE profiles 
SET 
  full_name = 'Yash Ryan Reliant',
  headline = 'Digital Marketing Specialist',
  email = 'yashryanreliant@gmail.com',
  location = 'Kerala, India',
  updated_at = NOW()
WHERE EXISTS (SELECT 1 FROM profiles LIMIT 1);
