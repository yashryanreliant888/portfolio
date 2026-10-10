# Gallery Feature Setup Instructions

This guide walks you through setting up the gallery feature in your portfolio with Supabase.

## 🗄️ Database Setup

### 1. Create the Gallery Table

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Open the file `supabase-gallery-schema.sql` in your project
4. Copy the entire SQL content and paste it into the SQL Editor
5. Click **Run** to execute the SQL

This will create:
- ✅ The `gallery` table with all necessary columns
- ✅ Indexes for better query performance
- ✅ RLS (Row Level Security) policies for public viewing and admin management
- ✅ Automatic `updated_at` timestamp trigger

### 2. Create Storage Bucket

You have two options for storing images:

#### Option A: Use Supabase Storage (Recommended)

1. Go to **Storage** in your Supabase dashboard
2. Click **New bucket**
3. Name it `gallery`
4. Make it **Public**
5. Create the bucket

Then uncomment the storage policies in the `supabase-gallery-schema.sql` file and run them.

#### Option B: Use Local /Gallery Folder

Keep your images in the `/Gallery` folder and use paths like `/Gallery/gallery1.jpg`. This is simpler but doesn't leverage Supabase's CDN.

### 3. Seed Initial Data

1. If using Supabase Storage, upload `gallery1.jpg` to the bucket first
2. Update the `image_path` in `supabase-gallery-seed.sql` to match your choice:
   - Supabase Storage: `https://[YOUR_PROJECT_ID].supabase.co/storage/v1/object/public/gallery/gallery1.jpg`
   - Local: `/Gallery/gallery1.jpg`
3. Run the seed SQL in the Supabase SQL Editor

## 📁 Files Created

### Database Files
- ✅ `supabase-gallery-schema.sql` - Database schema
- ✅ `supabase-gallery-seed.sql` - Seed data
- ✅ `lib/database.types.ts` - Updated with gallery types

### Frontend Pages
- ✅ `app/gallery/page.tsx` - Public gallery page
- ✅ `app/admin/gallery/page.tsx` - Admin gallery management

### Navigation
- ✅ `app/admin/AdminSidebar.tsx` - Updated with gallery link

## 🎨 Features

### Public Gallery Page (`/gallery`)
- Grid layout displaying all published gallery items
- Shows title, description, and date for each item
- Responsive design for all screen sizes
- Hover effects on images
- Empty state when no items exist

### Admin Gallery Page (`/admin/gallery`)
- Full CRUD operations (Create, Read, Update, Delete)
- Image upload to Supabase Storage
- Toggle publish/unpublish status
- Drag-to-reorder functionality (via sort order arrows)
- Date picker for each image
- Title and description fields
- Preview images before saving
- Manual URL entry option

## 🚀 Usage

### For Site Visitors
Navigate to `/gallery` to view all published gallery items

### For Admins

1. Login to admin panel
2. Click **Gallery** in the sidebar
3. Click **Add Gallery Item** to create new entries
4. Fill in:
   - **Title** (required)
   - **Description** (optional)
   - **Date** (optional)
   - **Image** - Upload file or paste URL
   - **Sort Order** - Controls display order
   - **Published** - Toggle visibility

5. Use the eye icon to publish/unpublish items
6. Use arrow buttons to reorder items
7. Edit or delete as needed

## 🔐 Security

The gallery table has RLS policies that:
- Allow anyone to view published items
- Restrict create/update/delete to authenticated admins
- Check the `admin_roles` table for admin/editor roles

## 📸 Image Recommendations

- **Format**: JPG, PNG, WebP
- **Size**: Optimize images to < 500KB for faster loading
- **Dimensions**: 1200x800px works well for the grid layout
- **Aspect Ratio**: 3:2 or 4:3 recommended

## 🎯 Next Steps

1. Run the schema SQL in Supabase
2. Create the storage bucket (if using Supabase Storage)
3. Upload your first image
4. Run the seed SQL
5. Visit `/gallery` to see your gallery!
6. Visit `/admin/gallery` to manage items

## 🐛 Troubleshooting

### Images not showing?
- Check the `image_path` value in the database
- Verify storage bucket is public
- Ensure the URL is correct

### Can't upload images?
- Verify storage bucket exists
- Check storage policies are created
- Confirm you're logged in as admin

### Changes not reflecting?
- Clear browser cache
- Check `is_published` is set to `true`
- Verify in Supabase dashboard that data was saved

## 📝 Database Schema

```typescript
type Gallery = {
  id: string              // UUID primary key
  title: string           // Image title
  description: string?    // Optional description
  image_path: string      // URL or path to image
  date: string?           // Optional date (YYYY-MM-DD)
  sort_order: number      // Display order (0-indexed)
  is_published: boolean   // Visibility toggle
  created_at: string      // Auto-generated
  updated_at: string      // Auto-updated on changes
}
```

## 🎨 Customization

### Change Grid Layout
Edit `app/gallery/page.tsx`:
```tsx
// Current: 3 columns on large screens
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"

// For 4 columns:
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
```

### Change Card Style
Modify the card classes in `app/gallery/page.tsx` to match your design system.

### Add More Fields
1. Update the SQL schema to add columns
2. Update `lib/database.types.ts`
3. Update both gallery page components
4. Update the admin form

---

**Need help?** Check the Supabase documentation or review the inline comments in the code files.
