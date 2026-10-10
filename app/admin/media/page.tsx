import { createClient } from '@/lib/supabase/server';
import { AdminHeader } from '../_components/AdminUI';

export default async function MediaPage() {
  const supabase = await createClient();
  const { data } = await supabase.storage.from('portfolio-media').list('', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });
  const files = data ?? [];
  return <div><AdminHeader title="Media library" description="Browse the public portfolio-media bucket and keep visual assets findable." /><div className="admin-panel mb-8"><p className="text-sm text-steel">Upload assets in the Supabase Storage dashboard or CLI using the bucket policies in <code>supabase/storage_setup.sql</code>.</p><p className="mt-2 text-xs text-ash">Accepted by policy: JPG, PNG, WebP, GIF · maximum 5 MB</p></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{files.length === 0 && <div className="admin-empty sm:col-span-2 lg:col-span-3">No media files found in portfolio-media.</div>}{files.map((file) => { const { data } = supabase.storage.from('portfolio-media').getPublicUrl(file.name); return <a key={file.id || file.name} href={data.publicUrl} target="_blank" rel="noreferrer" className="admin-row block"><div className="flex items-center justify-between gap-3"><span className="truncate text-sm text-almost-white">{file.name}</span><span className="text-xs text-steel">{file.metadata?.size ? `${Math.round(file.metadata.size / 1024)} KB` : 'asset'}</span></div></a>; })}</div></div>;
}
