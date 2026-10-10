# Seed Data

This directory contains JSON files with initial data for all database tables.

## 📁 Available Seed Files

| File | Table | Description |
|------|-------|-------------|
| `profile.json` | profiles | Your personal profile information |
| `skills.json` | skills | Technical skills and competencies |
| `experience.json` | experience | Work experience and internships |
| `education.json` | education | Educational qualifications |
| `certifications.json` | certifications | Professional certifications |
| `projects.json` | projects | Portfolio projects and case studies |

## 🚀 Quick Start

### Seed Everything at Once

```bash
npm run seed
# or
npm run seed:all
```

This will seed ALL tables in the correct order:
1. Profile
2. Skills
3. Experience
4. Education
5. Certifications
6. Projects

### Seed Individual Tables

```bash
# Seed only profile
npm run seed:profile

# Seed only skills
npm run seed:skills

# Seed only experience
npm run seed:experience

# Seed only education
npm run seed:education

# Seed only certifications
npm run seed:certifications

# Seed only projects
npm run seed:projects
```

## ⚠️ Important Notes

### Before Seeding

1. **Ensure your `.env.local` has these variables:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_key
   ```

2. **Database tables must exist** - Run migrations first if tables don't exist

3. **Service Role Key Required** - The regular anon key won't work for seeding

### What Happens When You Seed

- **Existing data is DELETED** - All current records are cleared before inserting new ones
- **IDs are regenerated** - New UUIDs are created (unless you specify them)
- **Timestamps are set** - `created_at` and `updated_at` are set to current time

### Exception: Profile Table

The profile table is handled differently:
- If a profile exists, it's **updated** (not deleted and recreated)
- If no profile exists, a new one is **created**
- This preserves your profile ID for foreign key relationships

## 📝 Customizing Seed Data

### 1. Edit the JSON Files

Open any JSON file and modify the data. All files are plain JSON arrays (except `profile.json` which is a single object).

**Example: Adding a new skill**

Edit `skills.json`:
```json
[
  {
    "name": "My New Skill",
    "category": "Digital Marketing",
    "description": "Description of the skill",
    "proficiency": "Advanced",
    "icon": "🚀",
    "external_url": null,
    "sort_order": 15,
    "is_active": true
  }
]
```

### 2. Understanding Field Types

#### Common Fields Across Tables

- `is_published` (boolean): `true` or `false` - Controls visibility on public pages
- `is_active` (boolean): `true` or `false` - Active status
- `is_featured` (boolean): `true` or `false` - Highlighted items
- `sort_order` (number): Controls display order (lower numbers appear first)

#### Date Fields

Use ISO 8601 date format:
- `"2024-01-15"` for dates
- `"2024-01-15T10:30:00Z"` for timestamps
- `null` for no date/ongoing

#### JSON Fields

Some fields accept arrays or objects:

**Arrays (channels, tools, gallery):**
```json
"channels": ["Instagram", "Facebook", "Twitter"]
```

**Objects (deliverables, results):**
```json
"deliverables": [
  {
    "title": "Marketing Plan",
    "description": "Complete strategy document",
    "file_path": "/path/to/file.pdf"
  }
]
```

**Responsibilities:**
```json
"responsibilities": [
  "Managed social media accounts",
  "Created content strategy"
]
```

### 3. File Paths

All file paths should:
- Start with `/` (relative to the public directory)
- Use forward slashes `/` even on Windows
- Point to actual files you'll upload

**Examples:**
- `/certificates/google-analytics.pdf`
- `/Projects/posters/campaign.png`
- `/profile-pic.jpg`

## 🔍 Data Validation

The seed scripts will check for:
- Required fields are present
- Data types match the schema
- Unique constraints (like slugs) are not violated

Common errors and fixes:

| Error | Cause | Fix |
|-------|-------|-----|
| `null value in column` | Required field is missing | Add the field to your JSON |
| `duplicate key value violates unique constraint` | Duplicate slug/unique field | Make sure slugs are unique |
| `invalid input syntax for type json` | Malformed JSON | Check JSON syntax in arrays/objects |

## 📊 Sample Data Included

### Profile
- Full name, headline, bio
- Social media links
- Contact information

### Skills (14 included)
- SEO, Google Analytics, Social Media
- Paid Advertising (Google Ads, Meta Ads)
- Tools (SEMrush, Canva, Photoshop)
- Strategy, Copywriting, Excel

### Experience (2 included)
- Digital Marketing Intern (placeholder)
- Freelance Social Media Manager (placeholder)

### Education (2 included)
- BBA from TKM College
- Higher Secondary (placeholder)

### Certifications (7 included)
- Google Analytics
- SEMrush SEO Toolkit
- Social Media Marketing
- Performance Advertising
- HCL GUVI Certifications (2)
- Professional Certificate

### Projects (6 included)
- College Research Project
- Content Calendar Strategy
- Social Media Poster Designs
- Blue Tokai Campaign
- Market Analysis IPCS
- Zepto Exam Mode Campaign

## 🛠️ Modifying vs. Re-seeding

### When to Edit JSON and Re-seed
- Adding/removing multiple items
- Major data structure changes
- Initial setup or complete reset

### When to Use Admin Panel (Once Built)
- Single item edits
- Updating existing content
- Day-to-day content management
- When you don't want to lose existing IDs

## 🔄 Backup Before Seeding

**Always backup before seeding if you have production data!**

```bash
# Using Supabase CLI
supabase db dump -f backup_$(date +%Y%m%d).sql --data-only
```

Or export from Supabase Dashboard:
- Table Editor → Select table → Export as CSV

## 🐛 Troubleshooting

### "Cannot find module 'tsx'"
```bash
npm install
```

### "Missing environment variables"
Check that `.env.local` has both:
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

### "Permission denied"
- Using service role key (not anon key)?
- Check RLS policies allow service role access

### "Table does not exist"
Run migrations first:
```bash
npm run db:push
```

### Seeds run but data doesn't show on website
- Check `is_published` is `true` in JSON
- Verify the page is querying the right table
- Check RLS policies allow public read access

## 📚 Next Steps

After seeding:
1. Visit your site pages to verify data displays correctly
2. Customize the seed data with your actual information
3. Build admin panel for easier content management
4. Set up file uploads to Supabase Storage
5. Update file paths to point to uploaded files
