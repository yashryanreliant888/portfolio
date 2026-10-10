-- ================================================
-- CERTIFICATIONS SEED DATA
-- Populated from yash-ryan-certifications.json
-- ================================================

-- Clear existing certifications (use with caution in production)
TRUNCATE TABLE certifications CASCADE;

-- Insert all certifications from JSON data
INSERT INTO certifications (
  cert_id,
  title,
  issuer,
  recipient_name,
  category,
  summary,
  skills_covered,
  issuer_partners_shown,
  issuing_organizations_shown,
  issue_date,
  expiry_date,
  valid_from,
  completion_date,
  credential_id,
  exam_id,
  verification_url,
  verification_status,
  qr_code_present,
  source_file,
  public_path,
  file_type,
  display_order,
  is_published
) VALUES
-- 1. GUVI Claude AI Productivity Course
(
  'guvi-claude-ai-productivity',
  'Claude AI in 90 Minutes Productivity Course: Build Your AI Work Assistant',
  'GUVI Geek Networks',
  'Yash Ryan',
  'Generative AI and Productivity',
  'Certificate of completion for a course focused on using Claude AI to build an AI work assistant and improve productivity.',
  ARRAY['Claude AI', 'AI-assisted productivity', 'AI work assistants'],
  ARRAY['HCL', 'Google for Education Partner'],
  NULL,
  '2026-08-16',
  NULL,
  NULL,
  NULL,
  'z2gs51k7mt66718885',
  NULL,
  'https://www.guvi.in/certificate?id=z2gs51k7mt66718885',
  'not_independently_verified',
  false,
  'HCL GUVI Certification - z2gs51k7mt66718885.png',
  '/certificates/guvi-claude-ai-productivity.png',
  'image/png',
  1,
  true
),

-- 2. Google AI-Powered Performance Ads
(
  'google-ai-powered-performance-ads',
  'AI-Powered Performance Ads Certification',
  'Google Ads',
  'Yash Ryan',
  'Paid Advertising',
  'Certification in AI-powered performance advertising, as named on the supplied certificate.',
  ARRAY['Google Ads', 'AI-powered performance advertising'],
  NULL,
  NULL,
  '2026-09-08',
  '2027-09-08',
  NULL,
  NULL,
  '193494480',
  NULL,
  NULL,
  'not_independently_verified',
  true,
  'Performance Ad.png',
  '/certificates/google-ai-powered-performance-ads.png',
  'image/png',
  2,
  true
),

-- 3. Semrush SEO Crash Course
(
  'semrush-seo-crash-course',
  'Semrush SEO Crash Course with Brian Dean',
  'Semrush Academy',
  'Yash Ryan Reliant',
  'Search Engine Optimization',
  'Certificate of achievement for completing the Semrush SEO Crash Course with Brian Dean.',
  ARRAY['SEO fundamentals'],
  NULL,
  NULL,
  NULL,
  '2027-09-20',
  NULL,
  NULL,
  '2f2a79212d',
  'Exam id-2',
  NULL,
  'not_independently_verified',
  false,
  'Semrush.pdf',
  '/certificates/semrush-seo-crash-course.pdf',
  'application/pdf',
  3,
  true
),

-- 4. HubSpot Social Media Certification
(
  'hubspot-social-media-certification',
  'Social Media Certified',
  'HubSpot Academy',
  'Yash Ryan',
  'Social Media Marketing',
  'The certificate describes knowledge of inbound social media strategy, including social monitoring, content strategy, social engagement, social media policies, and demonstrating social ROI to stakeholders.',
  ARRAY['Inbound social media strategy', 'Social monitoring', 'Content strategy', 'Social engagement', 'Social media policies', 'Social ROI'],
  NULL,
  NULL,
  NULL,
  '2028-10-18',
  '2026-09-19',
  NULL,
  '1bc0593661344ce3bad92e6eb218da90',
  NULL,
  NULL,
  'not_independently_verified',
  false,
  'SMM.png',
  '/certificates/hubspot-social-media-certified.png',
  'image/png',
  4,
  true
),

-- 5. One Million Prompters Initiative
(
  'one-million-prompters-completion',
  'One Million Prompters Initiative Certificate of Completion',
  'One Million Prompters Initiative',
  'Yash Ryan',
  'Artificial Intelligence',
  'Certificate for successfully completing the One Million Prompters initiative. The certificate describes the initiative as training people in prompt engineering for AI systems and contributing to a future-ready workforce.',
  ARRAY['Prompt engineering', 'AI systems'],
  NULL,
  ARRAY['Dubai Centre for Artificial Intelligence', 'Dubai Future Foundation'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'not_independently_verified',
  true,
  'yash-ryan-certificate.pdf',
  '/certificates/one-million-prompters-certificate.pdf',
  'application/pdf',
  5,
  true
),

-- 6. Dotin AI Integrated Social Media Marketing
(
  'dotin-ai-integrated-social-media-marketing',
  'AI Integrated Social Media Marketing',
  'Dotin Digital Academy',
  'Yash Ryan',
  'AI and Social Media Marketing',
  'Certificate of completion for AI Integrated Social Media Marketing.',
  ARRAY['AI-integrated social media marketing', 'Social media marketing'],
  NULL,
  NULL,
  '2026-08-09',
  NULL,
  NULL,
  '2026-08-09',
  'U4FHKB1E',
  NULL,
  NULL,
  'not_independently_verified',
  false,
  '1786279980240-certificate.png',
  '/certificates/dotin-ai-integrated-social-media-marketing.jpg',
  'image/jpeg',
  6,
  true
),

-- 7. be10x AI Tools & Claude Workshop
(
  'be10x-ai-tools-claude-workshop',
  'AI Tools & Claude Workshop',
  'be10x',
  'YASH RYAN',
  'AI Tools and Productivity',
  'Workshop certificate describing practical use of AI to create presentations in under five minutes, analyze data in under thirty minutes, and code or debug in under ten minutes.',
  ARRAY['AI-assisted presentations', 'AI-assisted data analysis', 'AI-assisted coding', 'AI debugging'],
  NULL,
  NULL,
  '2026-08-30',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'not_independently_verified',
  true,
  'Certificate.pdf',
  '/certificates/be10x-ai-tools-claude-workshop.pdf',
  'application/pdf',
  7,
  true
),

-- 8. Google Analytics Certification
(
  'google-analytics-certification-2026',
  'Google Analytics Certification (2026)',
  'Google Analytics',
  'Yash Ryan',
  'Analytics',
  'Certification in Google Analytics, issued in 2026, as stated on the supplied certificate.',
  ARRAY['Google Analytics', 'Web analytics'],
  NULL,
  NULL,
  '2026-08-31',
  '2027-08-31',
  NULL,
  NULL,
  '192813513',
  NULL,
  NULL,
  'not_independently_verified',
  true,
  'Google Analytics .pdf',
  '/certificates/google-analytics-certification-2026.pdf',
  'application/pdf',
  8,
  true
),

-- 9. GUVI Power BI Data Visualization
(
  'guvi-power-bi-data-visualization',
  'Microsoft Power BI Course: Data Visualization & Business Intelligence',
  'GUVI Geek Networks',
  'Yash Ryan',
  'Data Analytics and Business Intelligence',
  'Certificate of completion for a Microsoft Power BI course focused on data visualization and business intelligence.',
  ARRAY['Microsoft Power BI', 'Data visualization', 'Business intelligence'],
  ARRAY['HCL', 'Google for Education Partner'],
  NULL,
  '2026-09-22',
  NULL,
  NULL,
  NULL,
  'M5n0Xx9o0728094514',
  NULL,
  'https://www.guvi.in/certificate?id=M5n0Xx9o0728094514',
  'not_independently_verified',
  false,
  'HCL GUVI Certification - M5n0Xx9o0728094514.png',
  '/certificates/guvi-power-bi-data-visualization.png',
  'image/png',
  9,
  true
);

-- ================================================
-- VERIFICATION
-- ================================================
-- Show count of inserted certifications
DO $$
DECLARE
  cert_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO cert_count FROM certifications;
  RAISE NOTICE 'Successfully seeded % certifications', cert_count;
END $$;
