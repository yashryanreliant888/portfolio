# Projects Database Setup Guide

This guide walks you through setting up the projects database for your portfolio site.

## Overview

The projects system consists of:
- **Database schema**: SQL table definition with proper indexes and RLS policies
- **Seed data**: Pre-populated project information from your existing Projects folder
- **Seed script**: Automated tool to populate the database

## Step 1: Create the Database Table

You have two options:

### Option A: Using Supabase Dashboard (Recommended for beginners)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `supabase/migrations/001_projects_table.sql`
5. Paste it into the query editor
6. Click **Run** (or press Ctrl+Enter)
7. You should see a success message

### Option B: Using Supabase CLI

```bash
# Make sure you're logged in
supabase login

# Link your project (if not already linked)
supabase link --project-ref your-project-ref

# Push the migration
supabase db push
```

## Step 2: Set Up Environment Variables

1. Copy `.env.local.example` to `.env.local` if you haven't already:
   ```bash
   cp .env.local.example .env.local
   ```

2. Add your Supabase credentials to `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

3. Find these values in Supabase Dashboard:
   - Go to **Project Settings** → **API**
   - Copy the **Project URL** (for NEXT_PUBLIC_SUPABASE_URL)
   - Copy the **anon/public** key (for NEXT_PUBLIC_SUPABASE_ANON_KEY)
   - Copy the **service_role** key (for SUPABASE_SERVICE_ROLE_KEY)
   
   ⚠️ **Important**: Keep the service role key secret! Never commit it to version control.

## Step 3: Install Dependencies

```bash
npm install
```

This will install `tsx` (TypeScript executor) needed to run the seed script.

## Step 4: Review and Customize Project Data

Open `yash-ryan-projects.json` and review the project entries. The file contains all your projects extracted from the `Projects` folder:

- College Research Project (TKM)
- Content Calendar Strategy
- Social Media Poster Designs (8 posters)
- Blue Tokai Brew School Campaign
- Market Analysis of IPCS Kollam
- Zepto Exam Mode Launch Campaign

You can:
- Edit descriptions and details
- Change which projects are featured (`is_featured: true`)
- Toggle published status (`is_published: true/false`)
- Adjust sort order
- Add or remove projects

## Step 5: Run the Seed Script

```bash
npm run seed:projects
```

This will:
1. Clear existing projects in the database
2. Insert all projects from `yash-ryan-projects.json`
3. Display a summary of what was seeded

Expected output:
```
🌱 Starting projects seed...
📦 Found 6 projects to seed
🗑️  Clearing existing projects...
✅ Existing projects cleared

📝 Inserting: College Research Project - TKM
   ✅ Success (ID: uuid-here)
...

🎉 Seed completed!
   ✅ Success: 6
   ❌ Errors: 0
```

## Step 6: Verify the Data

### Option A: Supabase Dashboard
1. Go to **Table Editor** in the Supabase dashboard
2. Select the `projects` table
3. You should see all your seeded projects

### Option B: Your Website
1. Start your dev server: `npm run dev`
2. Navigate to `http://localhost:3000/projects`
3. You should see your projects displayed

## Database Schema Reference

### Projects Table Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `title` | TEXT | Project title |
| `slug` | TEXT | URL-friendly identifier (unique) |
| `category` | TEXT | Project category (e.g., "Campaign Strategy") |
| `summary` | TEXT | Brief project description |
| `objectives` | TEXT | Project goals |
| `target_audience` | TEXT | Who the project is for |
| `strategy` | TEXT | Approach taken |
| `channels` | JSONB | Marketing channels used |
| `tools` | JSONB | Tools and technologies |
| `deliverables` | JSONB | What was delivered |
| `results` | JSONB | Project outcomes and metrics |
| `cover_image_path` | TEXT | Path to cover image |
| `gallery` | JSONB | Array of image paths |
| `external_url` | TEXT | Link to live project |
| `is_featured` | BOOLEAN | Show in featured section |
| `is_published` | BOOLEAN | Visible to public |
| `sort_order` | INTEGER | Display order |
| `created_at` | TIMESTAMP | When created |
| `updated_at` | TIMESTAMP | When last modified |

## File Management

### Current File Locations

Your project files are currently in:
```
/Projects
  ├── college_project/
  ├── content calendar/
  ├── posters/
  └── Proposals/
```

### Next Steps for File Management

You have two options:

#### Option 1: Move to Public Directory
Move files to the `public` directory so Next.js can serve them:
```
/public
  └── projects/
      ├── college-project/
      ├── content-calendar/
      ├── posters/
      └── proposals/
```

Then update paths in `yash-ryan-projects.json` to `/projects/...`

#### Option 2: Use Supabase Storage
Upload files to Supabase Storage and update paths to use Supabase URLs. This is recommended for production.

## Troubleshooting

### "Missing environment variables" error
- Ensure `.env.local` exists and contains all three variables
- Check that variable names are exactly as specified
- Restart your terminal/dev server after changing `.env.local`

### "Permission denied" error
- Make sure you're using `SUPABASE_SERVICE_ROLE_KEY` (not the anon key)
- Verify the key is correct in your `.env.local`

### "Unique constraint violation" on slug
- Each project must have a unique slug
- Check `yash-ryan-projects.json` for duplicate slugs

### Projects not showing on website
- Check `is_published` is set to `true` in the database
- Verify the `/projects` page is working
- Check browser console for errors

## Next Steps

1. **Create Admin Panel**: Build pages to manage projects without re-seeding
2. **File Upload**: Implement Supabase Storage for project files
3. **Project Detail Pages**: The slug page already exists at `/projects/[slug]`
4. **Search & Filter**: Add filtering by category, featured status, etc.

## Maintenance

### Adding New Projects
1. Add the project to `yash-ryan-projects.json`
2. Run `npm run seed:projects` again
   
   OR
   
   Use the admin panel (once built) to add projects via the UI

### Updating Existing Projects
- Edit `yash-ryan-projects.json` and re-seed
- OR use the admin panel for individual updates

### Backup
Regularly export your projects table from Supabase:
```bash
# Using Supabase CLI
supabase db dump -f backup.sql --data-only --table projects
```

## Security Notes

- ✅ Public can view published projects (RLS policy enabled)
- ✅ Only admins can create/edit/delete projects
- ⚠️ Service role key bypasses all RLS policies - keep it secure
- ⚠️ Never expose service role key in client-side code

## Support

If you encounter issues:
1. Check the Supabase dashboard logs
2. Review the seed script output for specific errors
3. Verify your environment variables are correct
4. Check that the database migration ran successfully
