import { Calendar, Image as ImageIcon } from 'lucide-react';
import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { PageLayout } from '@/components/PageLayout';
import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/lib/database.types';

type Gallery = Database['public']['Tables']['gallery']['Row'];

export const metadata: Metadata = {
  title: 'Gallery | Yash Ryan Reliant',
  description: 'A visual archive of places, projects, and moments from Yash Ryan Reliant.',
};

function getDescription(value: unknown) {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && 'description' in value && typeof value.description === 'string') return value.description;
  return '';
}

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('gallery').select('*').eq('is_published', true).order('display_order', { ascending: true });
  const galleryItems = (data || []) as Gallery[];

  return (
    <PageLayout>
      <section className="py-section">
        <Container>
          <p className="terminal-kicker">Visual archive</p>
          <h1 className="display mt-5 text-almost-white">Gallery</h1>
          <p className="subheading mt-6 max-w-2xl text-steel">A collection of places, projects, and visual signals worth keeping.</p>
        </Container>
      </section>

      <section className="border-t border-white/10 py-section">
        <Container>
          {galleryItems.length > 0 ? (
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {galleryItems.map((item) => {
                const description = getDescription(item.description);
                return (
                  <article key={item.id} className="group">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-cards border border-white/15 bg-iron">
                      {item.image_path ? (
                        <img src={item.image_path} alt={item.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                      ) : (
                        <div className="grid h-full place-items-center"><ImageIcon size={42} className="text-ash" /></div>
                      )}
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-medium tracking-[-0.03em] text-almost-white">{item.title}</h2>
                        {description && <p className="mt-2 text-sm leading-6 text-steel">{description}</p>}
                      </div>
                      {item.date && <time dateTime={item.date} className="flex shrink-0 items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-ash"><Calendar size={12} />{new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</time>}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="admin-empty">The gallery is quiet for now. Check back soon.</div>
          )}
        </Container>
      </section>
    </PageLayout>
  );
}
