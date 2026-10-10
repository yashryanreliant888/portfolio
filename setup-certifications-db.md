# Setup Certifications Database

This guide will help you set up the enhanced certifications database in Supabase.

## Step 1: Access Supabase SQL Editor

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/bdteruwmfewuidtgkjib
2. Navigate to **SQL Editor** in the left sidebar

## Step 2: Run the Enhanced Schema Migration

1. In the SQL Editor, create a new query
2. Copy and paste the contents of `supabase/migrations/002_enhanced_certifications_schema.sql`
3. Click **RUN** to execute the migration
4. You should see a success message

This will:
- Drop the old certifications table
- Create a new enhanced certifications table with all the fields from your JSON
- Set up proper indexes for performance
- Configure Row Level Security (RLS) policies
- Create a helper view `certifications_with_status`

## Step 3: Seed the Certifications Data

1. Create another new query in the SQL Editor
2. Copy and paste the contents of `supabase/seeds/certifications_seed.sql`
3. Click **RUN** to execute the seed
4. You should see a notice showing "Successfully seeded 9 certifications"

This will populate your database with all 9 certifications from your JSON file.

## Step 4: Verify the Data

Run this query to verify everything was set up correctly:

```sql
SELECT 
  cert_id,
  title,
  issuer,
  category,
  issue_date,
  expiry_date,
  is_published,
  display_order
FROM certifications
ORDER BY display_order;
```

You should see all 9 certifications listed.

## Step 5: Check the Status View

Run this to see the computed status (valid/expired):

```sql
SELECT 
  cert_id,
  title,
  issuer,
  issue_date,
  expiry_date,
  current_status
FROM certifications_with_status
ORDER BY display_order;
```

## Step 6: Set Up Storage (Optional but Recommended)

If you haven't already set up storage for certificate files:

1. Go to **Storage** in the Supabase dashboard
2. Create a new bucket called `certificates`
3. Make it **public** so certificate files can be accessed directly
4. Upload your certificate files (PDFs and images) to match the `public_path` in the database

### Storage Structure Example:
```
certificates/
├── guvi-claude-ai-productivity.png
├── google-ai-powered-performance-ads.png
├── semrush-seo-crash-course.pdf
├── hubspot-social-media-certified.png
├── one-million-prompters-certificate.pdf
├── dotin-ai-integrated-social-media-marketing.jpg
├── be10x-ai-tools-claude-workshop.pdf
├── google-analytics-certification-2026.pdf
└── guvi-power-bi-data-visualization.png
```

## Step 7: Test API Access

You can test the API using your Supabase URL and keys:

### Public Read (Published Certifications Only)
```javascript
const { data, error } = await supabase
  .from('certifications')
  .select('*')
  .order('display_order');
```

### Admin Write (Requires Authentication)
```javascript
const { data, error } = await supabase
  .from('certifications')
  .insert({
    cert_id: 'new-cert-id',
    title: 'New Certification',
    issuer: 'Some Organization',
    recipient_name: 'Yash Ryan',
    public_path: '/certificates/new-cert.pdf',
    file_type: 'application/pdf'
  });
```

## Database Schema Summary

The new certifications table includes:

### Core Information
- `cert_id` - Unique identifier (e.g., "guvi-claude-ai-productivity")
- `title` - Certification title
- `issuer` - Issuing organization
- `recipient_name` - Who received it
- `category` - Type of certification
- `summary` - Description

### Skills & Partners
- `skills_covered` - Array of skills
- `issuer_partners_shown` - Partner organizations
- `issuing_organizations_shown` - Co-issuers

### Dates
- `issue_date` - When issued
- `expiry_date` - When it expires (if any)
- `valid_from` - Alternative validity start
- `completion_date` - Course completion

### Verification
- `credential_id` - Official ID
- `exam_id` - Exam identifier
- `verification_url` - Verification link
- `verification_status` - Status (verified, not_independently_verified, etc.)
- `qr_code_present` - QR code flag

### Files
- `source_file` - Original filename
- `public_path` - Public URL path
- `file_type` - MIME type

### Display
- `display_order` - Sort order
- `is_published` - Visibility flag

## Troubleshooting

### Issue: "relation does not exist"
**Solution**: Make sure you ran the migration first (Step 2) before the seed (Step 3)

### Issue: "duplicate key value"
**Solution**: The table already has data. Clear it first:
```sql
TRUNCATE TABLE certifications CASCADE;
```
Then re-run the seed file.

### Issue: "function is_admin() does not exist"
**Solution**: Run the initial schema first (`001_initial_schema.sql`) which creates the `is_admin()` function.

## Next Steps

After setting up the database:

1. **Build the frontend components** to display certifications
2. **Create admin pages** to manage certifications (add, edit, delete)
3. **Upload certificate files** to Supabase Storage
4. **Test the verification URLs** to ensure they work
5. **Add filtering and search** functionality for certifications
