import { createClient } from '@/lib/supabase/server';
import { AdminHeader } from '../_components/AdminUI';
import { updateAdminRole } from '../actions';

export default async function TeamPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('admin_roles').select('*').order('created_at', { ascending: true });
  const roles = data ?? [];
  return <div><AdminHeader title="Admin access" description="Grant or revoke dashboard access by Supabase Auth user ID." /><div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]"><section className="space-y-3">{roles.map((role) => <div key={role.user_id} className="admin-row"><div><p className="font-mono text-sm text-almost-white">{role.user_id}</p><p className="mt-1 text-xs text-steel">Added {new Date(role.created_at).toLocaleDateString()}</p></div><form action={updateAdminRole.bind(null, role.user_id, 'remove')}><button className="text-xs text-red-300 underline underline-offset-4" type="submit">Revoke</button></form></div>)}</section><div className="admin-panel"><h2 className="mb-2 text-lg font-medium text-almost-white">Add administrator</h2><p className="mb-5 text-xs leading-5 text-steel">Create the user in Supabase Auth first, then paste their UUID here.</p><form action={async (formData) => { 'use server'; const userId = String(formData.get('user_id') || '').trim(); if (userId) await updateAdminRole(userId, 'admin'); }} className="space-y-4"><label className="block"><span className="mb-2 block text-xs uppercase tracking-[0.12em] text-steel">User UUID</span><input name="user_id" required className="admin-input font-mono" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" /></label><button className="admin-primary" type="submit">Grant admin access</button></form></div></div></div>;
}
