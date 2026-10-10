-- ================================================
-- PROJECTS SEED DATA
-- Populated from seed-data/projects.json
-- ================================================

-- Clear existing projects (use with caution in production)
TRUNCATE TABLE projects CASCADE;

INSERT INTO projects (
  title,
  slug,
  category,
  summary,
  objectives,
  target_audience,
  strategy,
  channels,
  tools,
  deliverables,
  results,
  cover_image_path,
  gallery,
  external_url,
  is_featured,
  is_published,
  sort_order
) VALUES
-- 1. College Research Project
(
  'College Research Project - TKM',
  'college-research-project-tkm',
  'Academic Research',
  'Comprehensive research project completed during college at TKM, demonstrating analytical and documentation skills.',
  'To conduct in-depth research and present findings in a structured academic format.',
  'Academic evaluators and industry professionals',
  'Systematic research methodology with structured documentation and presentation of findings.',
  '["Academic Presentation", "Written Report"]'::jsonb,
  '["Microsoft Office", "Research Tools"]'::jsonb,
  '[
    {
      "title": "Research Report",
      "description": "Complete project documentation and findings",
      "file_path": "/Projects/college_project/TKM Project_Yash.pdf"
    }
  ]'::jsonb,
  '[
    {
      "metric": "Project Status",
      "value": "Completed",
      "description": "Successfully completed and submitted"
    }
  ]'::jsonb,
  '/Projects/college_project/TKM Project_Yash.pdf',
  '["/Projects/college_project/TKM Project_Yash.pdf"]'::jsonb,
  NULL,
  false,
  true,
  1
),

-- 2. Content Calendar Strategy
(
  'Content Calendar Strategy',
  'content-calendar-strategy',
  'Content Marketing',
  'Strategic content calendar planning for social media and digital marketing campaigns.',
  'Plan and organize content distribution across multiple channels for maximum engagement and consistency.',
  'Social media audiences and marketing teams',
  'Develop a structured content calendar with themed content, optimal posting times, and platform-specific strategies.',
  '["Social Media", "Content Marketing"]'::jsonb,
  '["Content Planning Tools", "Social Media Management"]'::jsonb,
  '[
    {
      "title": "Content Calendar",
      "description": "Visual content planning calendar",
      "file_path": "/Projects/content calendar/CONTENT CALENDER.png"
    }
  ]'::jsonb,
  '[
    {
      "metric": "Planning Efficiency",
      "value": "Improved",
      "description": "Streamlined content planning process"
    }
  ]'::jsonb,
  '/Projects/content calendar/CONTENT CALENDER.png',
  '["/Projects/content calendar/CONTENT CALENDER.png"]'::jsonb,
  NULL,
  true,
  true,
  2
),

-- 3. Social Media Poster Designs
(
  'Social Media Poster Designs',
  'social-media-poster-designs',
  'Graphic Design',
  'Collection of creative social media posters for various campaigns and initiatives including automation, referral programs, student events, and brand promotions.',
  'Create visually engaging social media content that drives engagement and communicates key messages effectively.',
  'Social media users and brand followers',
  'Design eye-catching graphics with clear messaging, strong visual hierarchy, and brand consistency across different campaign types.',
  '["Instagram", "Social Media"]'::jsonb,
  '["Adobe Photoshop", "Canva", "Graphic Design Software"]'::jsonb,
  '[
    {
      "title": "Automation Campaign Poster",
      "description": "Poster promoting automation services",
      "file_path": "/Projects/posters/AUTOMATION.png"
    },
    {
      "title": "Final Design",
      "description": "Finalized campaign poster",
      "file_path": "/Projects/posters/Final.png"
    },
    {
      "title": "GJ Campaign",
      "description": "Gujarat campaign poster",
      "file_path": "/Projects/posters/GJ.jpg"
    },
    {
      "title": "Instagram QR Code",
      "description": "Instagram profile QR code poster",
      "file_path": "/Projects/posters/Insta QR.jpg"
    },
    {
      "title": "Kashi Campaign",
      "description": "Kashi brand promotion poster",
      "file_path": "/Projects/posters/KASHI.png"
    },
    {
      "title": "Referral Program",
      "description": "Refer a friend campaign poster",
      "file_path": "/Projects/posters/Refer a friend.png"
    },
    {
      "title": "Review Campaign",
      "description": "Customer review encouragement poster",
      "file_path": "/Projects/posters/REVIEW.jpg"
    },
    {
      "title": "Students Day",
      "description": "Students Day celebration poster",
      "file_path": "/Projects/posters/Students Day.jpg"
    }
  ]'::jsonb,
  '[
    {
      "metric": "Designs Created",
      "value": "8+",
      "description": "Multiple poster designs for various campaigns"
    },
    {
      "metric": "Campaign Coverage",
      "value": "Diverse",
      "description": "Covered automation, events, referrals, and brand promotions"
    }
  ]'::jsonb,
  '/Projects/posters/AUTOMATION.png',
  '[
    "/Projects/posters/AUTOMATION.png",
    "/Projects/posters/Final.png",
    "/Projects/posters/GJ.jpg",
    "/Projects/posters/Insta QR.jpg",
    "/Projects/posters/KASHI.png",
    "/Projects/posters/Refer a friend.png",
    "/Projects/posters/REVIEW.jpg",
    "/Projects/posters/Students Day.jpg"
  ]'::jsonb,
  NULL,
  true,
  true,
  3
),

-- 4. Blue Tokai Brew School Campaign
(
  'Blue Tokai Brew School Campaign',
  'blue-tokai-brew-school-campaign',
  'Campaign Strategy',
  'Marketing campaign proposal for Blue Tokai''s Brew School initiative, focusing on coffee education and brand engagement.',
  'Develop a comprehensive marketing campaign to promote Blue Tokai''s Brew School, increase brand awareness, and drive enrollment.',
  'Coffee enthusiasts, professionals, and individuals interested in learning about coffee brewing techniques',
  'Multi-channel campaign leveraging education marketing, experiential content, and community building to position Blue Tokai as a coffee authority.',
  '["Social Media", "Email Marketing", "Content Marketing", "Events"]'::jsonb,
  '["PowerPoint", "Marketing Strategy Tools"]'::jsonb,
  '[
    {
      "title": "Campaign Proposal",
      "description": "Complete campaign strategy and execution plan",
      "file_path": "/Projects/Proposals/Blue_Tokai_Brew_School_Campaign.pptx"
    }
  ]'::jsonb,
  '[
    {
      "metric": "Proposal Status",
      "value": "Completed",
      "description": "Comprehensive campaign strategy developed"
    }
  ]'::jsonb,
  '/Projects/Proposals/Blue_Tokai_Brew_School_Campaign.pptx',
  '["/Projects/Proposals/Blue_Tokai_Brew_School_Campaign.pptx"]'::jsonb,
  NULL,
  true,
  true,
  4
),

-- 5. Market Analysis of IPCS Kollam
(
  'Market Analysis of IPCS Kollam',
  'market-analysis-ipcs-kollam',
  'Market Research',
  'Comprehensive market analysis for IPCS Kollam, examining market dynamics, competitive landscape, and growth opportunities.',
  'Conduct thorough market research to identify opportunities, challenges, and strategic recommendations for IPCS Kollam.',
  'Business stakeholders and decision-makers',
  'Systematic market research methodology including competitor analysis, market segmentation, and SWOT analysis.',
  '["Business Analysis", "Market Research"]'::jsonb,
  '["PowerPoint", "Market Research Tools", "Data Analysis"]'::jsonb,
  '[
    {
      "title": "Market Analysis Report",
      "description": "Complete market analysis with insights and recommendations",
      "file_path": "/Projects/Proposals/Market Analysis of IPCS Kollam.pptx"
    }
  ]'::jsonb,
  '[
    {
      "metric": "Analysis Depth",
      "value": "Comprehensive",
      "description": "In-depth market insights and strategic recommendations"
    }
  ]'::jsonb,
  '/Projects/Proposals/Market Analysis of IPCS Kollam.pptx',
  '["/Projects/Proposals/Market Analysis of IPCS Kollam.pptx"]'::jsonb,
  NULL,
  false,
  true,
  5
),

-- 6. Zepto Exam Mode Launch Campaign
(
  'Zepto Exam Mode Launch Campaign',
  'zepto-exam-mode-launch-campaign',
  'Campaign Strategy',
  'Strategic campaign proposal for Zepto''s Exam Mode feature launch, targeting students during exam periods with quick delivery services.',
  'Create a compelling go-to-market strategy for Zepto''s Exam Mode feature, focusing on student acquisition and retention during exam seasons.',
  'College and university students, particularly during exam periods',
  'Student-centric campaign leveraging relatable messaging, strategic timing, and partnerships with educational institutions to drive adoption of Exam Mode.',
  '["Digital Marketing", "Social Media", "Campus Marketing", "Influencer Partnerships"]'::jsonb,
  '["Marketing Planning", "Campaign Strategy"]'::jsonb,
  '[
    {
      "title": "Campaign Launch Strategy",
      "description": "Complete campaign strategy for Zepto Exam Mode launch",
      "file_path": "/Projects/Proposals/Zepto_ExamMode_Launch_Campaign.pdf"
    }
  ]'::jsonb,
  '[
    {
      "metric": "Strategy Status",
      "value": "Completed",
      "description": "Full campaign strategy and execution plan developed"
    }
  ]'::jsonb,
  '/Projects/Proposals/Zepto_ExamMode_Launch_Campaign.pdf',
  '["/Projects/Proposals/Zepto_ExamMode_Launch_Campaign.pdf"]'::jsonb,
  NULL,
  true,
  true,
  6
);

-- Verification
DO $$
DECLARE
  project_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO project_count FROM projects;
  RAISE NOTICE 'Successfully seeded % projects', project_count;
END $$;
