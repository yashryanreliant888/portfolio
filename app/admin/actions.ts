'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const ADMIN_TABLES = ['profiles', 'skills', 'experience', 'certifications', 'education', 'projects'] as const;
type AdminTable = (typeof ADMIN_TABLES)[number];

function clean(value: FormDataEntryValue | null) {
  return typeof value === 'string' ? value.trim() || null : null;
}

export async function saveAdminRecord(table: AdminTable, id: string | null, formData: FormData) {
  const { supabase } = await requireAdminForAction();
  const payload: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    if (key === 'id' || key === 'table' || key === 'redirectTo') continue;
    if (key === 'is_active' || key === 'is_published' || key === 'is_featured') payload[key] = value === 'on' || value === 'true';
    else if (key === 'sort_order' || key === 'display_order') payload[key] = Number(value) || 0;
    else if (key === 'channels' || key === 'tools' || key === 'deliverables' || key === 'results' || key === 'gallery' || key === 'responsibilities' || key === 'skills_covered') {
      try { payload[key] = JSON.parse(String(value)); } catch { payload[key] = String(value).split(',').map((item) => item.trim()).filter(Boolean); }
    } else payload[key] = clean(value);
  }
  const query = id ? supabase.from(table).update(payload).eq('id', id) : supabase.from(table).insert(payload);
  const { error } = await query;
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath(`/admin/${table}`);
}

export async function deleteAdminRecord(table: AdminTable, id: string) {
  const { supabase } = await requireAdminForAction();
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath(`/admin/${table}`);
}

export async function updateMessageStatus(id: string, status: string) {
  const { supabase } = await requireAdminForAction();
  const { error } = await supabase.from('contact_submissions').update({ status }).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/messages');
}

export async function updateAdminRole(userId: string, role: 'admin' | 'remove') {
  const { supabase } = await requireAdminForAction();
  if (role === 'remove') await supabase.from('admin_roles').delete().eq('user_id', userId);
  else await supabase.from('admin_roles').upsert({ user_id: userId, role: 'admin' });
  revalidatePath('/admin/team');
}

async function requireAdminForAction() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');
  const { data: role } = await supabase.from('admin_roles').select('role').eq('user_id', user.id).maybeSingle();
  if (role?.role !== 'admin') redirect('/admin/login');
  return { supabase, user };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/admin/login');
}
