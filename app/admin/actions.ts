'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const ADMIN_TABLES = ['profiles', 'skills', 'experience', 'certifications', 'education', 'projects'] as const;
type AdminTable = (typeof ADMIN_TABLES)[number];

function clean(value: FormDataEntryValue | null) {
  return typeof value === 'string' ? value.trim() || null : null;
}

function normalizeCertificateFileType(value: FormDataEntryValue) {
  if (typeof value !== 'string') return null;
  const normalized = value.trim().toLowerCase();
  return ['pdf', 'png', 'jpeg', 'jpg', 'webp'].includes(normalized)
    ? normalized
    : normalized === 'application/pdf'
      ? 'pdf'
      : normalized === 'image/png'
        ? 'png'
        : normalized === 'image/webp'
          ? 'webp'
          : normalized.startsWith('image/jpeg')
            ? 'jpg'
            : null;
}

export async function saveAdminRecord(table: AdminTable, id: string | null, formData: FormData) {
  const { supabase } = await requireAdminForAction();
  const payload: Record<string, unknown> = {};
  let certificateUploaded = false;
  const coverImageUpload = table === 'projects' ? formData.get('cover_image_upload') : null;
  for (const [key, value] of formData.entries()) {
    if (key === 'id' || key === 'table' || key === 'redirectTo') continue;
    if (key === 'cover_image_upload') continue;
    if (table === 'certifications' && key === 'certificate_upload' && value instanceof File && value.size > 0) {
      if (!['application/pdf', 'image/jpeg', 'image/png', 'image/webp'].includes(value.type)) {
        return { error: 'Certificates must be PDF, JPEG, PNG, or WebP files.' };
      }
      if (value.size > 10 * 1024 * 1024) {
        return { error: 'Certificates must be 10 MB or smaller.' };
      }
      const safeName = value.name.replace(/[^a-zA-Z0-9._-]/g, '-');
      const path = `certifications/${crypto.randomUUID()}-${safeName}`;
      const { error: uploadError } = await supabase.storage.from('portfolio-certificates').upload(path, value, { contentType: value.type || undefined, upsert: false });
      if (uploadError) return { error: `Certificate upload failed: ${uploadError.message}` };
      const { data: publicUrl } = supabase.storage.from('portfolio-certificates').getPublicUrl(path);
      const extension = safeName.split('.').pop()?.toLowerCase();
      const detectedFileType = extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'pdf' || extension === 'webp'
        ? extension
        : value.type === 'application/pdf' ? 'pdf' : value.type === 'image/png' ? 'png' : 'jpg';
      payload.public_path = publicUrl.publicUrl;
      payload.file_type = detectedFileType;
      payload.source_file = value.name;
      certificateUploaded = true;
      continue;
    }
    if (table === 'skills' && key === 'skill_logo_upload' && value instanceof File && value.size > 0) {
      if (!['image/png', 'image/jpeg'].includes(value.type)) {
        throw new Error('Skill logos must be PNG or JPEG files.');
      }
      if (value.size > 5 * 1024 * 1024) {
        throw new Error('Skill logos must be 5 MB or smaller.');
      }
      const safeName = value.name.replace(/[^a-zA-Z0-9._-]/g, '-');
      const path = `skills/${crypto.randomUUID()}-${safeName}`;
      const { error: uploadError } = await supabase.storage.from('portfolio-media').upload(path, value, { contentType: value.type || undefined, upsert: false });
      if (uploadError) throw new Error(`Skill logo upload failed: ${uploadError.message}`);
      const { data: publicUrl } = supabase.storage.from('portfolio-media').getPublicUrl(path);
      payload.logo_path = publicUrl.publicUrl;
      continue;
    }
    if (key === 'skill_logo_upload') continue;
    if (key === 'certificate_upload') continue;
    if (table === 'certifications' && certificateUploaded && (key === 'public_path' || key === 'file_type' || key === 'source_file')) continue;
    if (table === 'certifications' && key === 'file_type') {
      payload.file_type = normalizeCertificateFileType(value);
      continue;
    }
    if (key === 'is_active' || key === 'is_published' || key === 'is_featured') payload[key] = value === 'on' || value === 'true';
    else if (key === 'sort_order' || key === 'display_order') payload[key] = Number(value) || 0;
    else if (key === 'channels' || key === 'tools' || key === 'deliverables' || key === 'results' || key === 'gallery' || key === 'responsibilities' || key === 'skills_covered') {
      try { payload[key] = JSON.parse(String(value)); } catch { payload[key] = String(value).split(',').map((item) => item.trim()).filter(Boolean); }
    } else payload[key] = clean(value);
  }
  if (coverImageUpload instanceof File && coverImageUpload.size > 0) {
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(coverImageUpload.type)) {
      return { error: 'Cover images must be JPEG, PNG, WebP, or GIF files.' };
    }
    if (coverImageUpload.size > 5 * 1024 * 1024) {
      return { error: 'Cover images must be 5 MB or smaller.' };
    }
    const extension = coverImageUpload.type === 'image/jpeg' ? 'jpg' : coverImageUpload.type.slice('image/'.length);
    const path = `projects/${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage
      .from('portfolio-media')
      .upload(path, coverImageUpload, { contentType: coverImageUpload.type, upsert: false });
    if (uploadError) return { error: `Cover image upload failed: ${uploadError.message}` };
    const { data: publicUrl } = supabase.storage.from('portfolio-media').getPublicUrl(path);
    payload.cover_image_path = publicUrl.publicUrl;
  }
  if (table === 'certifications' && !id) {
    for (const requiredField of ['cert_id', 'title', 'issuer', 'recipient_name']) {
      if (!payload[requiredField]) return { error: `The ${requiredField.replaceAll('_', ' ')} field is required.` };
    }
    if (!payload.public_path) return { error: 'Upload a certificate file or provide a public file path.' };
    if (!payload.file_type) return { error: 'The file type field is required.' };
  }
  const query = id ? supabase.from(table).update(payload).eq('id', id) : supabase.from(table).insert(payload);
  const { error } = await query;
  if (error) return { error: error.message };
  revalidatePath('/');
  revalidatePath(`/admin/${table}`);
  if (table === 'projects') {
    revalidatePath('/projects');
    revalidatePath('/projects/[slug]', 'page');
  }
  return { success: true };
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
