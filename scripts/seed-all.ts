import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:');
  console.error('   - NEXT_PUBLIC_SUPABASE_URL');
  console.error('   - SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Helper function to read JSON file
function readSeedData<T>(filename: string): T {
  const filePath = path.join(process.cwd(), 'seed-data', filename);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

// Seed profile
async function seedProfile() {
  console.log('\n📝 Seeding Profile...');
  const profileData = readSeedData<any>('profile.json');

  // Check if profile exists
  const { data: existing } = await supabase
    .from('profiles')
    .select('id')
    .single();

  if (existing) {
    const { error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', existing.id);

    if (error) {
      console.error('   ❌ Error updating profile:', error.message);
      return false;
    }
    console.log('   ✅ Profile updated');
  } else {
    const { error } = await supabase
      .from('profiles')
      .insert(profileData);

    if (error) {
      console.error('   ❌ Error creating profile:', error.message);
      return false;
    }
    console.log('   ✅ Profile created');
  }
  return true;
}

// Seed skills
async function seedSkills() {
  console.log('\n🎯 Seeding Skills...');
  const skillsData = readSeedData<any[]>('skills.json');

  // Clear existing
  await supabase.from('skills').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  let success = 0;
  let errors = 0;

  for (const skill of skillsData) {
    const { error } = await supabase.from('skills').insert(skill);
    if (error) {
      console.error(`   ❌ ${skill.name}: ${error.message}`);
      errors++;
    } else {
      success++;
    }
  }

  console.log(`   ✅ Success: ${success} | ❌ Errors: ${errors}`);
  return errors === 0;
}

// Seed experience
async function seedExperience() {
  console.log('\n💼 Seeding Experience...');
  const experienceData = readSeedData<any[]>('experience.json');

  // Clear existing
  await supabase.from('experience').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  let success = 0;
  let errors = 0;

  for (const exp of experienceData) {
    const { error } = await supabase.from('experience').insert(exp);
    if (error) {
      console.error(`   ❌ ${exp.organization}: ${error.message}`);
      errors++;
    } else {
      success++;
    }
  }

  console.log(`   ✅ Success: ${success} | ❌ Errors: ${errors}`);
  return errors === 0;
}

// Seed education
async function seedEducation() {
  console.log('\n🎓 Seeding Education...');
  const educationData = readSeedData<any[]>('education.json');

  // Clear existing
  await supabase.from('education').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  let success = 0;
  let errors = 0;

  for (const edu of educationData) {
    const { error } = await supabase.from('education').insert(edu);
    if (error) {
      console.error(`   ❌ ${edu.qualification}: ${error.message}`);
      errors++;
    } else {
      success++;
    }
  }

  console.log(`   ✅ Success: ${success} | ❌ Errors: ${errors}`);
  return errors === 0;
}

// Seed certifications
async function seedCertifications() {
  console.log('\n🏆 Seeding Certifications...');
  const certificationsData = readSeedData<any[]>('certifications.json');

  // Clear existing
  await supabase.from('certifications').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  let success = 0;
  let errors = 0;

  for (const cert of certificationsData) {
    // Ensure array fields are actual arrays (not null/undefined)
    const row = {
      ...cert,
      skills_covered: cert.skills_covered ?? [],
      issuer_partners_shown: cert.issuer_partners_shown ?? [],
      issuing_organizations_shown: cert.issuing_organizations_shown ?? [],
    };
    const { error } = await supabase.from('certifications').insert(row);
    if (error) {
      console.error(`   ❌ ${cert.title}: ${error.message}`);
      errors++;
    } else {
      success++;
    }
  }

  console.log(`   ✅ Success: ${success} | ❌ Errors: ${errors}`);
  return errors === 0;
}

// Seed projects
async function seedProjects() {
  console.log('\n🚀 Seeding Projects...');
  const projectsData = readSeedData<any[]>('projects.json');

  // Clear existing
  await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  let success = 0;
  let errors = 0;

  for (const project of projectsData) {
    const { error } = await supabase.from('projects').insert(project);
    if (error) {
      console.error(`   ❌ ${project.title}: ${error.message}`);
      errors++;
    } else {
      success++;
    }
  }

  console.log(`   ✅ Success: ${success} | ❌ Errors: ${errors}`);
  return errors === 0;
}

// Main seed function
async function seedAll() {
  console.log('🌱 Starting complete database seed...');
  console.log('=' .repeat(60));

  const results = {
    profile: await seedProfile(),
    skills: await seedSkills(),
    experience: await seedExperience(),
    education: await seedEducation(),
    certifications: await seedCertifications(),
    projects: await seedProjects(),
  };

  console.log('\n' + '='.repeat(60));
  console.log('🎉 Seed Complete!\n');
  console.log('Summary:');
  console.log(`   Profile:        ${results.profile ? '✅' : '❌'}`);
  console.log(`   Skills:         ${results.skills ? '✅' : '❌'}`);
  console.log(`   Experience:     ${results.experience ? '✅' : '❌'}`);
  console.log(`   Education:      ${results.education ? '✅' : '❌'}`);
  console.log(`   Certifications: ${results.certifications ? '✅' : '❌'}`);
  console.log(`   Projects:       ${results.projects ? '✅' : '❌'}`);
  console.log('='.repeat(60));

  const allSuccess = Object.values(results).every(r => r);
  return allSuccess;
}

// Run the seed
seedAll()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
