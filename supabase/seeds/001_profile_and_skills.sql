-- ================================================
-- PROFILE AND SKILLS SEED DATA
-- Populated from seed-data/profile.json and seed-data/skills.json
-- ================================================

-- ================================================
-- PROFILE DATA
-- ================================================
-- Update or insert profile (only one profile should exist)
INSERT INTO profiles (
  full_name,
  headline,
  email,
  location,
  biography,
  profile_image_path,
  linkedin_url,
  instagram_url
)
VALUES (
  'Yash Ryan Reliant',
  'Digital Marketing Specialist | SEO | Content Strategy | Analytics',
  'yash@example.com',
  'India',
  'Digital marketing professional with expertise in SEO, social media management, and content strategy. Passionate about creating data-driven campaigns that deliver measurable results. Experienced in managing end-to-end digital marketing projects from strategy to execution.

Specializing in search engine optimization, paid advertising, and analytics, I help brands increase their online visibility and achieve their marketing goals. Certified in Google Analytics, SEMrush, and various digital marketing disciplines.',
  '/main-pic.png',
  'https://www.linkedin.com/in/yourprofile/',
  'https://www.instagram.com/yourprofile/'
)
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  headline = EXCLUDED.headline,
  email = EXCLUDED.email,
  location = EXCLUDED.location,
  biography = EXCLUDED.biography,
  profile_image_path = EXCLUDED.profile_image_path,
  linkedin_url = EXCLUDED.linkedin_url,
  instagram_url = EXCLUDED.instagram_url,
  updated_at = NOW();

-- ================================================
-- SKILLS DATA
-- ================================================
-- Clear existing skills
TRUNCATE TABLE skills CASCADE;

INSERT INTO skills (
  name,
  category,
  description,
  proficiency,
  icon,
  external_url,
  sort_order,
  is_active
) VALUES
('SEO (Search Engine Optimization)', 'Digital Marketing', 'On-page and off-page optimization, technical SEO, keyword research, and content strategy', 'Advanced', '🔍', NULL, 1, true),
('Google Analytics', 'Analytics', 'Web analytics, conversion tracking, audience analysis, and data-driven decision making', 'Advanced', '📊', NULL, 2, true),
('Social Media Marketing', 'Digital Marketing', 'Content strategy, community management, paid social advertising, and influencer partnerships', 'Advanced', '📱', NULL, 3, true),
('Content Marketing', 'Digital Marketing', 'Content strategy, copywriting, blog management, and editorial calendar planning', 'Advanced', '✍️', NULL, 4, true),
('Google Ads', 'Paid Advertising', 'Search ads, display campaigns, shopping ads, and performance optimization', 'Intermediate', '💰', NULL, 5, true),
('Meta Ads (Facebook/Instagram)', 'Paid Advertising', 'Campaign setup, audience targeting, creative optimization, and ROI tracking', 'Advanced', '📣', NULL, 6, true),
('Email Marketing', 'Digital Marketing', 'Campaign design, automation workflows, list segmentation, and A/B testing', 'Intermediate', '📧', NULL, 7, true),
('SEMrush', 'Tools', 'Competitive analysis, keyword research, backlink audits, and SEO reporting', 'Advanced', '🛠️', 'https://www.semrush.com/', 8, true),
('Canva', 'Design', 'Social media graphics, presentations, and marketing materials', 'Advanced', '🎨', 'https://www.canva.com/', 9, true),
('Adobe Photoshop', 'Design', 'Image editing, graphic design, and visual content creation', 'Intermediate', '🖼️', NULL, 10, true),
('Marketing Strategy', 'Strategy', 'Campaign planning, market research, competitive analysis, and brand positioning', 'Advanced', '🎯', NULL, 11, true),
('Copywriting', 'Content', 'Ad copy, landing pages, email campaigns, and persuasive writing', 'Advanced', '📝', NULL, 12, true),
('Microsoft Excel', 'Tools', 'Data analysis, reporting, pivot tables, and marketing dashboards', 'Advanced', '📈', NULL, 13, true),
('PowerPoint/Presentations', 'Tools', 'Pitch decks, campaign proposals, and client presentations', 'Advanced', '📊', NULL, 14, true);

-- Verification
DO $$
DECLARE
  skill_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO skill_count FROM skills;
  RAISE NOTICE 'Successfully seeded % skills', skill_count;
END $$;
