import { createClient } from '@/lib/supabase/server';
import { saveAdminRecord } from '../actions';
import { AdminHeader, RecordForm } from '../_components/AdminUI';

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: profile } = await supabase.from('profiles').select('*').limit(1).maybeSingle();
  const fields = [{ name: 'full_name', label: 'Full name', required: true }, { name: 'headline', label: 'Headline' }, { name: 'email', label: 'Email', type: 'email' as const }, { name: 'location', label: 'Location' }, { name: 'profile_image_path', label: 'Profile image path' }, { name: 'resume_file_path', label: 'Resume file path' }, { name: 'linkedin_url', label: 'LinkedIn URL', type: 'url' as const, social: 'linkedin' as const }, { name: 'instagram_url', label: 'Instagram URL', type: 'url' as const, social: 'instagram' as const }, { name: 'facebook_url', label: 'Facebook URL', type: 'url' as const, social: 'facebook' as const }, { name: 'youtube_url', label: 'YouTube URL', type: 'url' as const, social: 'youtube' as const }, { name: 'x_url', label: 'X / Twitter URL', type: 'url' as const, social: 'x' as const }, { name: 'tiktok_url', label: 'TikTok URL', type: 'url' as const, social: 'tiktok' as const }, { name: 'github_url', label: 'GitHub URL', type: 'url' as const, social: 'github' as const }, { name: 'threads_url', label: 'Threads URL', type: 'url' as const, social: 'threads' as const }, { name: 'website_url', label: 'Website URL', type: 'url' as const }, { name: 'biography', label: 'Biography', type: 'textarea' as const }];
  return <div><AdminHeader title="Profile" description="The single source of truth for your public identity and contact details." /><div className="admin-panel max-w-4xl"><RecordForm fields={fields} record={profile || undefined} action={saveAdminRecord.bind(null, 'profiles', profile?.id || null)} submitLabel="Save profile" /></div></div>;
}
