# Supabase Database Setup

This directory contains the database schema, migrations, and seed data for the Yash Ryan Portfolio.

## Directory Structure

```
supabase/
├── migrations/
│   ├── 001_initial_schema.sql              # Base tables (profiles, skills, experience, etc.)
│   ├── 002_enhanced_certifications_schema.sql  # Enhanced certifications table
│   └── 003_gallery_table.sql               # Gallery table
├── seeds/
│   ├── 001_profile_and_skills.sql          # Profile + 14 skills
│   ├── 002_education_and_experience.sql    # Education + experience
│   ├── 003_certifications.sql              # 9 certifications
│   ├── 004_projects.sql                    # 6 projects
│   └── 005_gallery.sql                     # Gallery items
├── storage_setup.sql                       # Storage bucket configuration
├── config.toml                             # Supabase CLI configuration
├── setup.ps1                               # Interactive PowerShell script
└── README.md                               # This file
```

## Quick Start with CLI

### Prerequisites

1. Install Supabase CLI:
```powershell
# Using npm
npm install -g supabase

# Or using Scoop (Windows)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

2. Make sure you have your Supabase credentials in `.env.local`

### Option 1: Using the Setup Script (Recommended)

Run the interactive setup script:

```powershell
cd supabase
.\setup.ps1
```

The script will guide you through:
- Linking to your remote project
- Pushing migrations
- Seeding the database
- Generating TypeScript types
- Local development options

### Option 2: Manual CLI Commands

```powershell
# 1. Link to your remote project
supabase link --project-ref bdteruwmfewuidtgkjib

# 2. Push all migrations
supabase db push --linked

# 3. Seed the database
supabase db execute --file ./seed.sql --linked
supabase db execute --file ./seeds/certifications_seed.sql --linked

# 4. Generate TypeScript types
supabase gen types typescript --linked > ../lib/database.types.ts
```

### Option 3: Reset Everything (Fresh Start)

⚠️ **WARNING**: This will delete all data and recreate the database!

```powershell
# This runs migrations and seeds in one command
supabase db reset --linked
```

## Setup Instructions (Manual - SQL Editor)

If you prefer not to use the CLI:

### 1. Apply Migrations

Go to Supabase SQL Editor and run in order:
1. `migrations/001_initial_schema.sql`
2. `migrations/002_enhanced_certifications_schema.sql`

### 2. Seed the Database

Run these in order:
1. `seed.sql` (general data)
2. `seeds/certifications_seed.sql` (certification data)

### 3. Setup Storage

Run `storage_setup.sql` to create storage buckets.

## Enhanced Certifications Schema

The `002_enhanced_certifications_schema.sql` migration creates a comprehensive certifications table with:

### Core Fields
- `cert_id` - Unique human-readable identifier
- `title` - Certification title
- `issuer` - Issuing organization
- `recipient_name` - Certificate recipient
- `category` - Certification category
- `summary` - Description of the certification

### Skills & Metadata
- `skills_covered` - Array of skills learned
- `issuer_partners_shown` - Partner organizations
- `issuing_organizations_shown` - Co-issuing organizations

### Dates
- `issue_date` - When the certification was issued
- `expiry_date` - When it expires (if applicable)
- `valid_from` - Alternative validity start date
- `completion_date` - Course completion date

### Verification
- `credential_id` - Official credential identifier
- `exam_id` - Exam identifier (if applicable)
- `verification_url` - URL to verify the certificate
- `verification_status` - Status: verified, not_independently_verified, expired, revoked
- `qr_code_present` - Whether a QR code appears on the certificate

### File Management
- `source_file` - Original filename for reference
- `public_path` - Public URL path for the certificate file
- `file_type` - MIME type (image/png, application/pdf, etc.)

### Display
- `display_order` - Sort order for display
- `is_published` - Whether to show publicly

## Database Views

### `certifications_with_status`
A convenience view that adds a computed `current_status` field showing whether each certification is 'valid' or 'expired' based on the expiry_date.

## Row Level Security (RLS)

All tables have RLS enabled with the following policies:

- **Public Access**: Can view published records only
- **Admin Access**: Full CRUD operations on all records

## Helper Functions

### `is_admin()`
Returns true if the current user has an admin role. Used by RLS policies to control access.

## TypeScript Types

After running migrations, generate TypeScript types:

```bash
# Generate types
supabase gen types typescript --local > lib/database.types.ts

# Or if linked to remote:
supabase gen types typescript --project-id bdteruwmfewuidtgkjib > lib/database.types.ts
```

## Certificate Files

Certificate files referenced in the database should be:
1. Uploaded to Supabase Storage in the `certificates` bucket
2. Made publicly accessible or use signed URLs
3. Paths should match the `public_path` field in the database

Example storage structure:
```
certificates/
├── guvi-claude-ai-productivity.png
├── google-ai-powered-performance-ads.png
├── semrush-seo-crash-course.pdf
└── ...
```

## Notes

- The certifications data is populated from `yash-ryan-certifications.json`
- All dates are stored in ISO format (YYYY-MM-DD)
- Arrays are stored as PostgreSQL array types for better querying
- The schema supports both image and PDF certificates
- Verification URLs are stored but not automatically validated


## 🌱 What Gets Seeded?

The seeding process populates **35 records** across **7 tables**:

### 1. Profile & Skills (`001_profile_and_skills.sql`)
- **1 profile**: Yash Ryan Reliant with bio, contact info, social links
- **14 skills**: SEO, Google Analytics, Social Media Marketing, Content Marketing, Google Ads, Meta Ads, Email Marketing, SEMrush, Canva, Photoshop, Marketing Strategy, Copywriting, Excel, PowerPoint

### 2. Education & Experience (`002_education_and_experience.sql`)
- **2 education records**: BBA from TKM College, Higher Secondary Education
- **2 experience records**: Digital Marketing Intern, Freelance Social Media Manager

### 3. Certifications (`003_certifications.sql`)
- **9 certifications** from `yash-ryan-certifications.json`
- Complete metadata: skills covered, verification URLs, credential IDs, dates
- File paths mapped: `/certificates/*.png`, `/certificates/*.pdf`

### 4. Projects (`004_projects.sql`)
- **6 projects** from `seed-data/projects.json`:
  1. College Research Project - TKM
  2. Content Calendar Strategy ⭐
  3. Social Media Poster Designs ⭐ (8 posters)
  4. Blue Tokai Brew School Campaign ⭐
  5. Market Analysis of IPCS Kollam
  6. Zepto Exam Mode Launch Campaign ⭐
- Complete with objectives, deliverables, results, gallery images

### 5. Gallery (`005_gallery.sql`)
- **1 gallery item** with template for adding more

**Total: 35 records across 7 tables!**

## 📁 Folder to Database Mapping

All file paths in the database reference these folders:

```
/certificates/   → certificates/ folder (9 files)
/Projects/       → Projects/ folder (4 subfolders)
/Gallery/        → Gallery/ folder (images)
/main-pic.png    → root folder (profile image)
```

After seeding, upload these files to Supabase Storage to match the database paths.

## ✅ Verification

After running `npm run db:setup`, verify with this SQL query:

```sql
SELECT 'profiles' as table_name, COUNT(*) as count FROM profiles
UNION ALL SELECT 'skills', COUNT(*) FROM skills
UNION ALL SELECT 'education', COUNT(*) FROM education
UNION ALL SELECT 'experience', COUNT(*) FROM experience
UNION ALL SELECT 'certifications', COUNT(*) FROM certifications
UNION ALL SELECT 'projects', COUNT(*) FROM projects
UNION ALL SELECT 'gallery', COUNT(*) FROM gallery;
```

Expected results:
- profiles: 1
- skills: 14
- education: 2
- experience: 2
- certifications: 9
- projects: 6
- gallery: 1
