-- ================================================
-- EDUCATION AND EXPERIENCE SEED DATA
-- Populated from seed-data/education.json and seed-data/experience.json
-- ================================================

-- ================================================
-- EDUCATION DATA
-- ================================================
-- Clear existing education
TRUNCATE TABLE education CASCADE;

INSERT INTO education (
  qualification,
  institution,
  field_of_study,
  study_start,
  study_end,
  status,
  grade,
  description,
  sort_order,
  is_published
) VALUES
(
  'Bachelor of Business Administration (BBA)',
  'TKM College',
  'Marketing',
  '2021-06-01',
  '2024-05-31',
  'Completed',
  NULL,
  'Focused on marketing, business strategy, and consumer behavior with hands-on projects in digital marketing and market research.',
  1,
  true
),
(
  'Higher Secondary Education',
  'Your High School Name',
  'Commerce',
  '2019-06-01',
  '2021-05-31',
  'Completed',
  NULL,
  'Commerce stream with focus on business studies, accountancy, and economics.',
  2,
  true
);

-- ================================================
-- EXPERIENCE DATA
-- ================================================
-- Clear existing experience
TRUNCATE TABLE experience CASCADE;

INSERT INTO experience (
  organization,
  role,
  employment_type,
  start_date,
  end_date,
  duration_label,
  description,
  responsibilities,
  organization_logo_path,
  sort_order,
  is_published
) VALUES
(
  'Your Company Name',
  'Digital Marketing Intern',
  'Internship',
  '2024-01-01',
  NULL,
  'Jan 2024 - Present',
  'Contributing to digital marketing campaigns with focus on SEO, content creation, and social media management.',
  '["Managed social media accounts and created engaging content", "Conducted keyword research and implemented on-page SEO strategies", "Designed marketing materials and campaign graphics", "Analyzed campaign performance using Google Analytics", "Collaborated with team on content calendar planning"]'::jsonb,
  NULL,
  1,
  true
),
(
  'Freelance',
  'Social Media Manager',
  'Freelance',
  '2023-06-01',
  '2023-12-31',
  'Jun 2023 - Dec 2023 · 7 mos',
  'Managed social media presence for small businesses and created content strategies to increase engagement.',
  '["Created and scheduled social media content across platforms", "Designed posters and graphics for campaigns", "Managed client communications and deliverables", "Tracked engagement metrics and provided monthly reports", "Developed content calendars aligned with business goals"]'::jsonb,
  NULL,
  2,
  true
);

-- Verification
DO $$
DECLARE
  education_count INTEGER;
  experience_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO education_count FROM education;
  SELECT COUNT(*) INTO experience_count FROM experience;
  RAISE NOTICE 'Successfully seeded % education records and % experience records', education_count, experience_count;
END $$;
