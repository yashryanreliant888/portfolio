import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables:');
  console.error('- NEXT_PUBLIC_SUPABASE_URL');
  console.error('- SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedProjects() {
  console.log('🌱 Starting projects seed...\n');

  try {
    // Read the projects JSON file
    const projectsPath = path.join(process.cwd(), 'seed-data', 'projects.json');
    const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

    console.log(`📦 Found ${projectsData.length} projects to seed\n`);

    // Clear existing projects (optional - comment out if you want to keep existing data)
    console.log('🗑️  Clearing existing projects...');
    const { error: deleteError } = await supabase
      .from('projects')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (deleteError) {
      console.warn('Warning: Could not clear existing projects:', deleteError.message);
    } else {
      console.log('✅ Existing projects cleared\n');
    }

    // Insert projects one by one
    let successCount = 0;
    let errorCount = 0;

    for (const project of projectsData) {
      console.log(`📝 Inserting: ${project.title}`);
      
      const { data, error } = await supabase
        .from('projects')
        .insert({
          title: project.title,
          slug: project.slug,
          category: project.category,
          summary: project.summary,
          objectives: project.objectives,
          target_audience: project.target_audience,
          strategy: project.strategy,
          channels: project.channels,
          tools: project.tools,
          deliverables: project.deliverables,
          results: project.results,
          cover_image_path: project.cover_image_path,
          gallery: project.gallery,
          external_url: project.external_url,
          is_featured: project.is_featured,
          is_published: project.is_published,
          sort_order: project.sort_order,
        })
        .select()
        .single();

      if (error) {
        console.error(`   ❌ Error: ${error.message}`);
        errorCount++;
      } else {
        console.log(`   ✅ Success (ID: ${data.id})`);
        successCount++;
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log('🎉 Seed completed!');
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Errors: ${errorCount}`);
    console.log('='.repeat(50) + '\n');

    // Query and display seeded projects
    console.log('📊 Seeded Projects Summary:\n');
    const { data: projects } = await supabase
      .from('projects')
      .select('title, slug, category, is_featured, is_published')
      .order('sort_order');

    if (projects) {
      projects.forEach((project, index) => {
        const featured = project.is_featured ? '⭐' : '  ';
        const published = project.is_published ? '✓' : '✗';
        console.log(`${index + 1}. ${featured} [${published}] ${project.title}`);
        console.log(`   Category: ${project.category}`);
        console.log(`   Slug: ${project.slug}\n`);
      });
    }

  } catch (error) {
    console.error('❌ Fatal error during seed:', error);
    process.exit(1);
  }
}

// Run the seed function
seedProjects()
  .then(() => {
    console.log('✅ All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Unhandled error:', error);
    process.exit(1);
  });
