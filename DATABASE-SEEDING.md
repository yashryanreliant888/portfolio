# Complete Database Seeding Guide

This guide covers everything you need to know about seeding your Supabase database with initial data.

## 🎯 Overview

The seeding system provides:
- ✅ Pre-populated data for all database tables
- ✅ One command to seed everything
- ✅ Individual scripts to seed specific tables
- ✅ Easy-to-edit JSON files
- ✅ Automatic data validation

## 📊 What Gets Seeded

| Table | Records | Command |
|-------|---------|---------|
| **Profile** | 1 profile | `npm run seed:profile` |
| **Skills** | 14 skills | `npm run seed:skills` |
| **Experience** | 2 positions | `npm run seed:experience` |
| **Education** | 2 qualifications | `npm run seed:education` |
| **Certifications** | 7 certificates | `npm run seed:certifications` |
| **Projects** | 6 projects | `npm run seed:projects` |
| **All Tables** | Everything | `npm run seed` or `npm run seed:all` |

## 🚀 Quick Start (3 Steps)

### Step 1: Setup Environment Variables

Add to your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Where to find these:**
1. Go to your Supabase project dashboard
2. Click **Project Settings** (gear icon)
3. Click **API** in the sidebar
4. Copy the values

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Run the Seed

```bash
# Seed everything
npm run seed

# Or seed individual tables
npm run seed:projects
npm run seed:skills
# ... etc
```

## 📁 Project Structure

```
yash-portfolio/
├── seed-data/              # JSON files with data
│   ├── profile.json        # Your profile
│   ├── skills.json         # Skills list
│   ├── experience.json     # Work history
│   ├── education.json      # Education history
│   ├── certifications.json # Certificates
│   └── projects.json       # Portfolio projects
│
├── scripts/                # Seed scripts
│   ├── seed-all.ts        # Seeds everything
│   ├── seed-profile.ts    # Seeds profile
│   ├── seed-skills.ts     # Seeds skills
│   ├── seed-experience.ts # Seeds experience
│   ├── seed-education.ts  # Seeds education
│   ├── seed-certifications.ts # Seeds certs
│   └── seed-projects.ts   # Seeds projects
│
└── supabase/
    └── migrations/
        └── 001_projects_table.sql  # Creates tables
```

## 💡 All Available Commands

```bash
# Seed all tables at once
npm run seed              # Main command
npm run seed:all          # Same as above

# Seed individual tables
npm run seed:profile      # Just profile
npm run seed:skills       # Just skills
npm run seed:experience   # Just experience
npm run seed:education    # Just education
npm run seed:certifications # Just certifications
npm run seed:projects     # Just projects

# Database management (requires Supabase CLI)
npm run db:link          # Link to Supabase project
npm run db:push          # Push migrations
npm run db:types         # Generate TypeScript types
npm run db:setup         # Complete setup (link + push + seed + types)
```

## 🎨 Customizing Your Data

### 1. Edit JSON Files

All seed data is in the `seed-data/` folder. Simply edit the JSON files:

```bash
# Open in VS Code
code seed-data/profile.json
code seed-data/skills.json
# ... etc
```

### 2. Update Your Profile

Edit `seed-data/profile.json`:

```json
{
  "full_name": "Your Name",
  "headline": "Your Professional Headline",
  "email": "your.email@example.com",
  "location": "Your Location",
  "biography": "Your bio...",
  "profile_image_path": "/your-photo.jpg",
  "linkedin_url": "https://linkedin.com/in/yourprofile",
  "instagram_url": "https://instagram.com/yourprofile"
}
```

### 3. Add/Edit Skills

Edit `seed-data/skills.json`:

```json
[
  {
    "name": "Your Skill",
    "category": "Category Name",
    "description": "What you can do",
    "proficiency": "Advanced",
    "icon": "🚀",
    "sort_order": 1,
    "is_active": true
  }
]
```

**Proficiency Levels:** Beginner, Intermediate, Advanced, Expert

**Categories (current):**
- Digital Marketing
- Analytics
- Paid Advertising
- Tools
- Design
- Strategy
- Content

### 4. Update Experience

Edit `seed-data/experience.json`:

```json
[
  {
    "organization": "Company Name",
    "role": "Your Position",
    "employment_type": "Full-time",
    "start_date": "2024-01-01",
    "end_date": null,
    "duration_label": "Jan 2024 - Present",
    "description": "Brief description",
    "responsibilities": [
      "What you did",
      "Your achievements",
      "Key responsibilities"
    ],
    "sort_order": 1,
    "is_published": true
  }
]
```

**Employment Types:** Full-time, Part-time, Internship, Freelance, Contract

### 5. Update Education

Edit `seed-data/education.json`:

```json
[
  {
    "qualification": "Degree Name",
    "institution": "University/College",
    "field_of_study": "Your Major",
    "study_start": "2021-06-01",
    "study_end": "2024-05-31",
    "status": "Completed",
    "grade": "First Class",
    "description": "What you studied...",
    "sort_order": 1,
    "is_published": true
  }
]
```

**Status Options:** Completed, In Progress, On Hold

### 6. Update Certifications

Edit `seed-data/certifications.json` - structured based on your actual certificate files in the `/certificates` folder.

### 7. Update Projects

Edit `seed-data/projects.json` - structured based on files in your `/Projects` folder with:
- Title, slug, category
- Objectives, strategy, target audience
- Tools, channels, deliverables
- Results and metrics
- Cover images and gallery

See `seed-data/README.md` for detailed field descriptions.

## 🔄 Workflow

### Initial Setup
1. Edit JSON files with your actual data
2. Run `npm run seed` to populate database
3. View your website to verify

### Adding New Items
1. Add to the appropriate JSON file
2. Run `npm run seed:tablename`
3. Verify on your website

### Updating Existing Items
- **Option A:** Edit JSON and re-seed (loses any database-only changes)
- **Option B:** Use admin panel once built (recommended for production)

## ⚠️ Important Warnings

### Data Will Be Deleted

When you run a seed script:
- ❌ **All existing data in that table is DELETED**
- ✅ **New data from JSON is inserted**

**Exception:** The profile table updates existing instead of deleting.

### Backup First

If you have important data:

```bash
# Export from Supabase Dashboard
# Table Editor → Select Table → Export as CSV

# Or use Supabase CLI
supabase db dump -f backup.sql --data-only
```

### Never Commit Service Key

Your `.env.local` should be in `.gitignore`. NEVER commit your service role key to Git!

## 🐛 Common Issues

### Issue: "Missing environment variables"

**Cause:** `.env.local` doesn't have required variables

**Fix:**
```bash
# Check your .env.local has these:
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

### Issue: "Cannot find module 'tsx'"

**Cause:** Dependencies not installed

**Fix:**
```bash
npm install
```

### Issue: "Permission denied"

**Cause:** Using anon key instead of service key, or RLS blocking

**Fix:**
- Use `SUPABASE_SERVICE_ROLE_KEY` (not anon key)
- Service role bypasses RLS automatically

### Issue: "Table does not exist"

**Cause:** Migrations haven't been run

**Fix:**
```bash
# Option A: Supabase Dashboard
# SQL Editor → New Query → Paste migration SQL

# Option B: Supabase CLI
npm run db:push
```

### Issue: "Duplicate key value violates unique constraint"

**Cause:** Duplicate slug or unique field in JSON

**Fix:** 
- Check for duplicate slugs in your JSON
- Each project slug must be unique
- Each skill name should be unique

### Issue: Data seeded but not showing on website

**Causes & Fixes:**
- ❌ `is_published: false` → ✅ Change to `true` in JSON
- ❌ RLS policy blocks public read → ✅ Check policies in Supabase
- ❌ Page query is wrong → ✅ Check the page's Supabase query

## 📚 What's Included

### Profile Data
- Full name: Yash Ryan Reliant
- Professional headline
- Contact information
- Social media links
- Biography

### Skills (14 total)
**Digital Marketing:**
- SEO, Social Media Marketing, Content Marketing

**Analytics:**
- Google Analytics

**Paid Advertising:**
- Google Ads, Meta Ads

**Tools:**
- SEMrush, Canva, Adobe Photoshop, Excel, PowerPoint

**Other:**
- Marketing Strategy, Copywriting

### Experience (2 positions - EDIT THESE!)
- Digital Marketing Intern (placeholder)
- Freelance Social Media Manager (placeholder)

**⚠️ These are templates - replace with your actual experience!**

### Education (2 qualifications)
- BBA from TKM College
- Higher Secondary Education

### Certifications (7 certificates)
Based on files in your `/certificates` folder:
- Google Analytics
- SEMrush SEO Toolkit
- Social Media Marketing
- Performance Advertising
- 2x HCL GUVI Certifications
- Professional Certificate

### Projects (6 projects)
Based on your `/Projects` folder:
1. College Research Project (TKM)
2. Content Calendar Strategy ⭐
3. Social Media Poster Designs (8 posters) ⭐
4. Blue Tokai Brew School Campaign ⭐
5. Market Analysis IPCS Kollam
6. Zepto Exam Mode Campaign ⭐

## 🎯 Next Steps

After seeding:

1. **Verify Data**
   - Visit each page on your website
   - Check that data displays correctly
   - Look for any missing images or broken links

2. **Customize Content**
   - Replace placeholder experience with your actual work history
   - Update education with accurate details
   - Refine project descriptions
   - Add your actual professional photo

3. **Handle File Uploads**
   - Move files to `public/` directory, OR
   - Upload to Supabase Storage
   - Update paths in JSON accordingly

4. **Build Admin Panel**
   - Create pages under `/admin`
   - Allow editing without re-seeding
   - Implement file upload functionality

5. **Set Up Production**
   - Use Supabase Storage for files
   - Configure CDN if needed
   - Set up proper backups

## 📖 Additional Resources

- `seed-data/README.md` - Detailed JSON structure documentation
- `scripts/README.md` - Technical details about seed scripts
- `SETUP-PROJECTS-DB.md` - Projects-specific setup guide

## 🆘 Need Help?

1. Check error messages - they're usually specific
2. Verify environment variables are correct
3. Ensure migrations have been run
4. Check Supabase dashboard logs
5. Confirm JSON syntax is valid (use a JSON validator)

## 🔐 Security Checklist

- ✅ `.env.local` is in `.gitignore`
- ✅ Service role key is NOT in any committed files
- ✅ Service role key is NOT in client-side code
- ✅ RLS policies are enabled on all tables
- ✅ Public can only read published content
- ✅ Only admins can write/update/delete

---

**Ready to seed?**

```bash
npm run seed
```

That's it! Your database will be populated with all the initial data. 🎉
