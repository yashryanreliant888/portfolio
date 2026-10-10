# 🚀 Quick Start: Seed Your Portfolio Database

## ⚡ TL;DR - One Command

```powershell
npm run db:setup
```

That's it! This will:
- Link to Supabase
- Apply 3 migrations
- Seed 35 records across 7 tables
- Generate TypeScript types

**Time: ~2-3 minutes**

---

## ✅ Prerequisites

1. **Supabase CLI installed**
   ```powershell
   npm install -g supabase
   ```

2. **Environment variables set** (`.env.local`)
   ```env
    NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
    SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

---

## 📊 What Gets Seeded

| Table | Count |
|-------|-------|
| Profile | 1 |
| Skills | 14 |
| Education | 2 |
| Experience | 2 |
| Certifications | 9 |
| Projects | 6 |
| Gallery | 1 |
| **TOTAL** | **35** |

---

## 🎯 Step-by-Step (if you want details)

### 1. Run the Setup
```powershell
npm run db:setup
```

### 2. Verify It Worked
Go to Supabase Dashboard → Table Editor

Check these tables:
- `profiles` (1 row)
- `skills` (14 rows)
- `certifications` (9 rows)
- `projects` (6 rows)

### 3. Upload Files to Storage

Create buckets in Supabase Storage:
- `certificates` (public)
- `projects` (public)
- `gallery` (public)

Upload files from:
- `certificates/` folder → `certificates` bucket
- `Projects/` folder → `projects` bucket
- `Gallery/` folder → `gallery` bucket

---

## 🔄 Alternative: Interactive Script

```powershell
cd supabase
.\setup.ps1
```

Follow the menu to:
1. Link to project
2. Push migrations
3. Seed database
4. Generate types

---

## ✅ Verify Everything

Run this SQL in Supabase SQL Editor:

```sql
SELECT 'profiles' as table, COUNT(*) as count FROM profiles
UNION ALL SELECT 'skills', COUNT(*) FROM skills
UNION ALL SELECT 'education', COUNT(*) FROM education
UNION ALL SELECT 'experience', COUNT(*) FROM experience
UNION ALL SELECT 'certifications', COUNT(*) FROM certifications
UNION ALL SELECT 'projects', COUNT(*) FROM projects
UNION ALL SELECT 'gallery', COUNT(*) FROM gallery;
```

Expected results: 1, 14, 2, 2, 9, 6, 1

---

## 📁 Data Sources

All data comes from:
- ✅ `seed-data/*.json` files
- ✅ `yash-ryan-certifications.json`
- ✅ `certificates/` folder
- ✅ `Projects/` folder (with subfolders)
- ✅ `Gallery/` folder

---

## 🆘 Troubleshooting

### "supabase: command not found"
```powershell
npm install -g supabase
# Then restart terminal
```

### "Project not linked"
```powershell
npm run db:link
```

### Need a fresh start?
```powershell
npm run db:reset  # ⚠️ Deletes all data!
```

---

## 📚 More Help

- **Complete Guide**: `SUPABASE_SETUP.md`
- **Technical Details**: `supabase/README.md`
- **Seeding Config**: See artifacts above

---

## 🎉 Done!

Once seeded, you have a complete portfolio database with:
- Personal profile and bio
- 14 professional skills
- Educational background
- Work experience
- 9 certifications with verification
- 6 projects with deliverables
- Gallery for showcasing work

Now you can:
1. Build frontend components
2. Create admin pages
3. Upload files to Storage
4. Launch your portfolio! 🚀
