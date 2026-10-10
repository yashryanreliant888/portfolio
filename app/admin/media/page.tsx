import { createClient } from '@/lib/supabase/server';
import { AdminHeader } from '../_components/AdminUI';

type MediaFile = {
  path: string;
  name: string;
  id: string | null;
  updated_at: string | null;
  metadata: { size?: number; mimetype?: string } | null;
};

async function listMediaFiles(supabase: Awaited<ReturnType<typeof createClient>>, prefix = ''): Promise<MediaFile[]> {
  const { data, error } = await supabase.storage.from('portfolio-media').list(prefix, {
    limit: 100,
    sortBy: { column: 'created_at', order: 'desc' },
  });

  if (error || !data) return [];

  const files: MediaFile[] = [];
  for (const entry of data) {
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    const isFolder = !entry.id && !entry.metadata;
    if (isFolder) {
      files.push(...await listMediaFiles(supabase, path));
      continue;
    }
    files.push({
      path,
      name: entry.name,
      id: entry.id,
      updated_at: entry.updated_at,
      metadata: (entry.metadata as MediaFile['metadata']) || null,
    });
  }
  return files;
}

export default async function MediaPage() {
  const supabase = await createClient();
  const files = await listMediaFiles(supabase);

  return (
    <div className="admin-page">
      <AdminHeader title="Media library" description="Browse the public media bucket and keep visual assets findable." />
      <div className="admin-panel mb-8">
        <p className="text-sm text-steel">Uploaded assets appear here automatically, including files inside gallery and skills folders.</p>
        <p className="mt-2 text-xs text-ash">JPG, PNG, WebP, GIF · maximum 5 MB</p>
      </div>
      {files.length === 0 ? (
        <div className="admin-empty">No media files found in portfolio-media.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {files.map((file) => {
            const { data } = supabase.storage.from('portfolio-media').getPublicUrl(file.path);
            const mimeType = file.metadata?.mimetype || '';
            const isImage = mimeType.startsWith('image/');
            const size = file.metadata?.size ? `${Math.max(1, Math.round(file.metadata.size / 1024))} KB` : 'Asset';
            return (
              <a key={file.id || file.path} href={data.publicUrl} target="_blank" rel="noreferrer" className="admin-media-card">
                <div className="admin-media-card__preview">
                  {isImage ? <img src={data.publicUrl} alt="" loading="lazy" /> : <span aria-hidden="true">FILE</span>}
                </div>
                <div className="admin-media-card__info">
                  <span className="truncate text-sm text-almost-white">{file.name}</span>
                  <span className="text-xs text-steel">{size}</span>
                </div>
                <span className="admin-media-card__path">{file.path}</span>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
