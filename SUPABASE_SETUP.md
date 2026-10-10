# Supabase CLI Setup & Seeding Guide

Complete guide to setting up your Supabase database using the CLI.

## 🎯 Prerequisites

### 1. Install Supabase CLI

Choose one method:

**Using npm (recommended):**
```powershell
npm install -g supabase
```

**Using Scoop (Windows):**
```powershell
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

**Verify installation:**
```powershell
supabase --version
```

### 2. Environment Variables

Make sure your `.env.local` file exists with:
```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
```

## 🚀 Quick Setup (3 Methods)

### Method 1: NPM Scripts (Easiest)

```powershell
# Complete setup in one command
npm run db:setup

# Or step by step:
npm run db:link      # Link to remote project
npm run db:push      # Push migrations
npm run db:seed      # Seed data
npm run db:types     # Generate TypeScript types
```

### Method 2: Interactive PowerShell Script

```powershell
cd supabase
.\setup.ps1
```

Select from the menu:
1. Link to remote project
2. Push migrations
3. Seed database
4. Reset database (fresh start)
5. Start local dev
6. Stop local dev
7. Generate types

### Method 3: Manual CLI Commands

```powershell
# 1. Link to your remote project
supabase link --project-ref bdteruwmfewuidtgkjib

# 2. Push all migrations to remote
supabase db push --linked

# 3. Seed the database
supabase db execute --file ./supabase/seed.sql --linked
supabase db execute --file ./supabase/seeds/certifications_seed.sql --linked

# 4. Generate TypeScript types
supabase gen types typescript --linked > lib/database.types.ts
```

## 📋 Available NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run db:link` | Link to remote Supabase project |
| `npm run db:push` | Push migrations to remote |
| `npm run db:seed` | Run all seed files |
| `npm run db:reset` | ⚠️ Reset database (deletes all data) |
| `npm run db:types` | Generate TypeScript types |
| `npm run db:setup` | Complete setup (all above) |
| `npm run supabase:start` | Start local Supabase |
| `npm run supabase:stop` | Stop local Supabase |
| `npm run supabase:status` | Check local status |

## 🔄 Common Workflows

### First Time Setup
```powershell
npm run db:setup
```

### After Schema Changes
```powershell
npm run db:push
npm run db:types
```

### Re-seed Database
```powershell
npm run db:seed
```

### Fresh Start (Reset Everything)
```powershell
npm run db:reset
```

## 🌱 What Gets Seeded?

### 1. General Data (`seed.sql`)
- Skills
- Education
- Experience
- Profile info

### 2. Certifications (`seeds/certifications_seed.sql`)
- 9 certifications from `yash-ryan-certifications.json`
- All metadata (skills, verification, dates)
- File paths for certificate images/PDFs

## 🧪 Local Development

Want to test locally before pushing to production?

```powershell
# Start local Supabase (includes PostgreSQL, Auth, Storage, Studio)
npm run supabase:start

# Check status
npm run supabase:status

# Access local Studio at http://localhost:54323

# Stop when done
npm run supabase:stop
```

## 🔍 Verify Everything Worked

### Check Migrations
```powershell
supabase db list --linked
```

### Check Seeded Data
Go to Supabase Studio → Table Editor → certifications

Or run in SQL Editor:
```sql
SELECT COUNT(*) FROM certifications;
-- Should return 9

SELECT cert_id, title, issuer FROM certifications ORDER BY display_order;
```

### Check TypeScript Types
Open `lib/database.types.ts` - should have `certifications` table with all new fields.

## 🐛 Troubleshooting

### "supabase: command not found"
- Install Supabase CLI (see Prerequisites)
- Restart your terminal

### "Project not linked"
```powershell
npm run db:link
```

### "Migration already exists"
The migration was already applied. To force reapply:
```powershell
npm run db:reset  # ⚠️ Deletes all data
```

### "Permission denied" on setup.ps1
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

### Seed file not found
Make sure you're in the project root when running npm scripts.

### Want to add more seed data?
1. Create a new file in `supabase/seeds/`
2. Add it to `config.toml` in the `sql_paths` array
3. Run `npm run db:seed`

## 📁 File Structure Explained

```
supabase/
├── config.toml                      # CLI configuration
├── migrations/                      # Database schema changes
│   ├── 001_initial_schema.sql      # Base tables, RLS, policies
│   └── 002_enhanced_certifications_schema.sql  # Enhanced certs table
├── seeds/                           # Seed data files
│   └── certifications_seed.sql     # 9 certifications
├── seed.sql                         # General seed data (runs first)
├── storage_setup.sql                # Storage buckets
└── setup.ps1                        # Interactive setup script
```

## 🎓 Next Steps

After seeding:

1. **Upload Certificate Files**
   - Go to Storage in Supabase Dashboard
   - Create `certificates` bucket (public)
   - Upload files matching `public_path` in database

2. **Build Frontend**
   - Create certification display components
   - Create admin CRUD pages
   - Add filtering/search

3. **Test API**
   ```typescript
   const { data } = await supabase
     .from('certifications')
     .select('*')
     .order('display_order');
   ```

## 💡 Pro Tips

- **Always run `db:types` after schema changes** to keep TypeScript in sync
- **Use `db:reset` sparingly** - it deletes everything
- **Test locally first** with `supabase:start` before pushing to production
- **Commit migrations** but not seed data if it changes frequently
- **Use the interactive script** (`setup.ps1`) if you're new to Supabase CLI

## 📚 More Resources

- [Supabase CLI Docs](https://supabase.com/docs/reference/cli)
- [Database Migrations](https://supabase.com/docs/guides/cli/local-development#database-migrations)
- [Seeding Data](https://supabase.com/docs/guides/cli/seeding-your-database)
