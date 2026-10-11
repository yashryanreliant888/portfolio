import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { PageLayout } from '@/components/PageLayout';
import { GalleryGrid, DbGalleryItem } from '@/components/GalleryGrid';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Gallery | Yash Ryan Reliant',
  description: 'Visual archive and Instagram-style field dispatches from Yash Ryan Reliant.',
};

const FALLBACK_ITEMS: DbGalleryItem[] = [
  {
    id: 'fallback-1',
    title: 'Visual Field Note',
    description: 'A captured moment in time from the digital marketing journey in Kerala.',
    image_path: '/Gallery/gallery1.jpg',
    date: '2024-01-15',
    display_order: 1,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default async function GalleryPage() {
  const supabase = await createClient();
  const [{ data: profile }, { data: dbGallery }] = await Promise.all([
    supabase.from('profiles').select('*').single(),
    supabase
      .from('gallery')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true }),
  ]);

  const galleryItems = (dbGallery && dbGallery.length > 0 ? dbGallery : FALLBACK_ITEMS) as DbGalleryItem[];

  return (
    <PageLayout>
      <section className="pt-8 sm:pt-12 pb-16 sm:pb-24">
        <Container>
          <div className="mx-auto max-w-4xl px-2 sm:px-6 mb-8 sm:mb-12">
            <h1 className="display text-almost-white tracking-[-0.04em]">Gallery</h1>
          </div>
          <GalleryGrid items={galleryItems} profile={profile} />
        </Container>
      </section>
    </PageLayout>
  );
}
