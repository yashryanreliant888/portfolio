# Database Seeding - Quick Reference Card

## 🚀 The One Command You Need

```bash
npm run seed
```

This seeds **ALL** tables with data from `seed-data/*.json` files.

---

## 📋 All Available Commands

```bash
npm run seed              # ← Seeds everything
npm run seed:all          # ← Same as above

npm run seed:profile      # ← Just profile table
npm run seed:skills       # ← Just skills table
npm run seed:experience   # ← Just experience table
npm run seed:education    # ← Just education table
npm run seed:certifications # ← Just certifications table
npm run seed:projects     # ← Just projects table
```

---

## 📊 What Gets Seeded

| Command | Table | Records | What's Included |
|---------|-------|---------|-----------------|
| `seed:profile` | profiles | 1 | Your profile info |
| `seed:skills` | skills | 14 | SEO, Analytics, Tools, etc. |
| `seed:experience` | experience | 2 | Work history ⚠️ EDIT! |
| `seed:education` | education | 2 | BBA, Secondary |
| `seed:certifications` | certifications | 7 | Google Analytics, etc. |
| `seed:projects` | projects | 6 | Portfolio projects |

---

## ⚙️ First-Time Setup

```bash
# 1. Add to .env.local
NEXT_PUBLIC_SUPABASE_URL=your-url
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# 2. Install
npm install

# 3. Seed
npm run seed
```

---

## 📝 Editing Data

### Step 1: Edit JSON
```bash
code seed-data/profile.json      # Edit your profile
code seed-data/skills.json       # Edit skills
code seed-data/experience.json   # Edit experience
# ... etc
```

### Step 2: Re-seed
```bash
npm run seed:profile    # Just what you edited
# or
npm run seed            # Everything
```

---

## ⚠️ Before You Seed

- ✅ `.env.local` has `SUPABASE_SERVICE_ROLE_KEY`
- ✅ Database tables exist (run migrations if not)
- ⚠️ **Seeding DELETES existing data** (except profile which updates)
- 💾 Backup first if you have important data

---

## 🐛 Quick Fixes

```bash
# Missing modules?
npm install

# Environment variables?
# Check .env.local has:
# - NEXT_PUBLIC_SUPABASE_URL
# - SUPABASE_SERVICE_ROLE_KEY

# Tables don't exist?
npm run db:push    # (if using Supabase CLI)
```

---

## 📁 Where Everything Is

```
seed-data/              ← Edit these JSON files
  ├── profile.json
  ├── skills.json
  ├── experience.json
  ├── education.json
  ├── certifications.json
  └── projects.json

scripts/                ← Seed scripts (don't edit)
  ├── seed-all.ts
  └── seed-*.ts files
```

---

## 📚 Full Guides

- **`DATABASE-SEEDING.md`** - Complete guide (read this first!)
- **`seed-data/README.md`** - JSON structure details
- **`SETUP-PROJECTS-DB.md`** - Projects-specific guide

---

## 💡 Common Workflows

### Initial Setup
```bash
npm run seed              # Seed everything
npm run dev               # Start dev server
# → Visit http://localhost:3000 to verify
```

### Adding New Skill
```bash
# 1. Edit seed-data/skills.json
# 2. Run:
npm run seed:skills
```

### Updating Your Profile
```bash
# 1. Edit seed-data/profile.json
# 2. Run:
npm run seed:profile
```

### Major Data Update
```bash
# 1. Edit multiple JSON files
# 2. Run:
npm run seed              # Re-seed everything
```

---

## 🎯 Remember

**The main command:** `npm run seed`

**Edit data here:** `seed-data/*.json`

**Documentation:** `DATABASE-SEEDING.md`

That's all you need to know! 🎉
