# Database Seeding Scripts

This directory contains scripts to seed your Supabase database with initial data.

## Projects Seeding

### Prerequisites

1. **Environment Variables**: Ensure your `.env.local` file contains:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

2. **Service Role Key**: You need the Supabase service role key (not the anon key) to bypass Row Level Security policies. Find it in:
   - Supabase Dashboard → Project Settings → API → Service Role Key

### Running the Seed Script

```bash
# Install dependencies if not already installed
npm install

# Run the projects seed script
npx tsx scripts/seed-projects.ts
```

### What the Script Does

1. **Clears existing projects** - Removes all current project entries (can be disabled by commenting out the delete section)
2. **Reads project data** - Loads data from `yash-ryan-projects.json`
3. **Inserts projects** - Adds each project to the database
4. **Displays summary** - Shows success/error counts and lists all seeded projects

### Project Data Structure

The `yash-ryan-projects.json` file contains an array of project objects with the following structure:

```json
{
  "title": "Project Title",
  "slug": "project-slug",
  "category": "Category Name",
  "summary": "Brief description",
  "objectives": "Project goals",
  "target_audience": "Who this is for",
  "strategy": "Approach taken",
  "channels": ["Channel 1", "Channel 2"],
  "tools": ["Tool 1", "Tool 2"],
  "deliverables": [
    {
      "title": "Deliverable name",
      "description": "What was delivered",
      "file_path": "/path/to/file"
    }
  ],
  "results": [
    {
      "metric": "Metric name",
      "value": "Result value",
      "description": "What this means"
    }
  ],
  "cover_image_path": "/path/to/cover/image",
  "gallery": ["/path/to/image1", "/path/to/image2"],
  "external_url": "https://example.com",
  "is_featured": true,
  "is_published": true,
  "sort_order": 1
}
```

### Modifying Project Data

1. Edit `yash-ryan-projects.json` to add/remove/modify projects
2. Run the seed script again
3. Projects will be cleared and re-seeded with new data

### File Paths

All file paths in the JSON are relative to the public directory and should start with `/`. For example:
- `/Projects/posters/AUTOMATION.png`
- `/Projects/Proposals/Blue_Tokai_Brew_School_Campaign.pptx`

These files should exist in your `public` directory for Next.js to serve them.

## Database Migration

Before seeding, ensure the projects table exists:

```bash
# If using Supabase CLI
supabase db push

# Or manually run the migration SQL in Supabase Dashboard
# SQL Editor → New Query → Paste contents of supabase/migrations/001_projects_table.sql
```

## Troubleshooting

### Error: Missing environment variables
- Check that `.env.local` exists and contains the required variables
- Ensure you're using the SERVICE_ROLE_KEY, not the ANON_KEY

### Error: Permission denied
- Verify you're using the service role key
- Check that RLS policies allow the service role to insert data

### Error: Unique constraint violation
- The slug field must be unique
- Check for duplicate slugs in your JSON file

### Error: Cannot find module 'tsx'
```bash
npm install -D tsx
```

## Admin Panel Integration

Once seeded, projects can be managed through the admin panel:
- View all projects at `/admin/projects` (to be created)
- Edit individual projects
- Upload new project files
- Toggle published/featured status

## Next Steps

1. Create admin pages for project management
2. Implement file upload functionality
3. Add project detail pages
4. Create project filtering/search
