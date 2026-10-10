# Supabase Database Setup

This directory contains the database schema, migrations, and seed data for the Yash Ryan Portfolio.

## Directory Structure

```
supabase/
├── migrations/
│   ├── 001_initial_schema.sql       # Initial database schema
│   └── 002_enhanced_certifications_schema.sql  # Enhanced certifications table
├── seeds/
│   └── certifications_seed.sql      # Certification data from JSON
├── seed.sql                          # General seed data
├── storage_setup.sql                 # Storage bucket configuration
└── README.md                         # This file
```

## Setup Instructions

### 1. Apply Migrations

Migrations should be applied in order. If you're using Supabase CLI:

```bash
# Initialize Supabase (if not already done)
supabase init

# Link to your project
supabase link --project-ref bdteruwmfewuidtgkjib

# Apply all migrations
supabase db push
```

Or apply them manually in the Supabase SQL Editor in this order:
1. `migrations/001_initial_schema.sql`
2. `migrations/002_enhanced_certifications_schema.sql`

### 2. Seed the Database

After migrations are applied, run the seed files:

```bash
# Using Supabase CLI
supabase db reset  # This applies migrations and seeds

# Or manually run in SQL Editor:
# 1. seed.sql (general data)
# 2. seeds/certifications_seed.sql (certification data)
```

### 3. Setup Storage

Run `storage_setup.sql` to create the storage buckets for certificates and other assets.

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
