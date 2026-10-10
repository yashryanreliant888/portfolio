import { createClient } from '@/lib/supabase/server';
import { PageLayout } from '@/components/PageLayout';
import { Container } from '@/components/Container';
import { SectionHeading } from '@/components/SectionHeading';
import { Button } from '@/components/Button';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from('projects')
    .select('title, summary')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Projects`,
    description: project.summary || `Digital marketing project: ${project.title}`,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (!project) {
    notFound();
  }

  const channels = (project.channels as string[]) || [];
  const tools = (project.tools as string[]) || [];
  const deliverables: unknown[] = Array.isArray(project.deliverables) ? project.deliverables : [];
  const results: unknown[] = Array.isArray(project.results) ? project.results : [];
  const galleryEntries: unknown[] = Array.isArray(project.gallery) ? project.gallery : [];
  const gallery = galleryEntries.flatMap((entry: unknown) => {
        const path = typeof entry === 'string' ? entry : entry && typeof entry === 'object' && 'file_path' in entry && typeof entry.file_path === 'string' ? entry.file_path : null;
        if (path && !path.startsWith('file://') && /^(https?:\/\/|\/)/i.test(path) && /\.(avif|gif|jpe?g|png|webp)(\?.*)?$/i.test(path)) return [path];
        return [];
      });
  const coverPath = typeof project.cover_image_path === 'string' ? project.cover_image_path : null;
  const coverIsUsable = Boolean(coverPath && !coverPath.startsWith('file://') && /^(https?:\/\/|\/)/i.test(coverPath));
  const coverIsImage = Boolean(coverIsUsable && /\.(avif|gif|jpe?g|png|webp)(\?.*)?$/i.test(coverPath));
  const coverIsDocument = Boolean(coverIsUsable && !coverIsImage);

  return (
    <PageLayout>
      {/* Header */}
      <section className="py-section">
        <Container size="narrow">
          {/* Category */}
          {project.category && (
            <p className="text-sm uppercase tracking-wide text-steel mb-4">
              {project.category}
            </p>
          )}

          {/* Title */}
          <h1 className="display mb-6 text-almost-white">{project.title}</h1>

          {/* Summary */}
          {project.summary && (
            <p className="subheading text-graphite mb-8 leading-relaxed">
              {project.summary}
            </p>
          )}

          {/* Featured badge */}
          {project.is_featured && (
            <span className="inline-flex items-center gap-2 text-sm text-signal-violet mb-8">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Featured Project
            </span>
          )}
        </Container>
      </section>

      {/* Cover Image */}
      {coverPath && coverIsUsable && (
        <section className="py-8">
          <Container>
            {coverIsImage ? <div className="relative w-full aspect-[16/9] rounded-cards overflow-hidden bg-iron"><Image src={coverPath} alt={project.title} fill className="object-cover" priority /></div> : coverIsDocument ? <a href={coverPath} target="_blank" rel="noopener noreferrer" className="flex min-h-40 items-center justify-between gap-6 rounded-cards border border-ash/20 bg-iron p-8 text-almost-white transition-colors hover:border-lavender-mist"><span><span className="mb-2 block text-xs uppercase tracking-[0.14em] text-lavender-mist">Project document</span><span className="block text-lg">Open the project file</span></span><span className="text-sm text-steel">PDF ↗</span></a> : null}
          </Container>
        </section>
      )}

      {/* Project Details */}
      <section className="py-section border-t border-ash/20">
        <Container size="narrow">
          <div className="space-y-12">
            {/* Objectives */}
            {project.objectives && (
              <div>
                <h2 className="heading-sm mb-4 text-soft-white">Objectives</h2>
                <p className="body text-graphite leading-relaxed whitespace-pre-line">
                  {project.objectives}
                </p>
              </div>
            )}

            {/* Target Audience */}
            {project.target_audience && (
              <div>
                <h2 className="heading-sm mb-4 text-soft-white">Target Audience</h2>
                <p className="body text-graphite leading-relaxed whitespace-pre-line">
                  {project.target_audience}
                </p>
              </div>
            )}

            {/* Strategy */}
            {project.strategy && (
              <div>
                <h2 className="heading-sm mb-4 text-soft-white">Strategy</h2>
                <p className="body text-graphite leading-relaxed whitespace-pre-line">
                  {project.strategy}
                </p>
              </div>
            )}

            {/* Channels */}
            {channels.length > 0 && (
              <div>
                <h2 className="heading-sm mb-4 text-soft-white">Channels</h2>
                <div className="flex flex-wrap gap-2">
                  {channels.map((channel, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 text-sm bg-iron text-almost-white rounded-buttons"
                    >
                      {channel}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tools */}
            {tools.length > 0 && (
              <div>
                <h2 className="heading-sm mb-4 text-soft-white">Tools & Technologies</h2>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 text-sm border border-ash/20 text-graphite rounded-buttons"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Deliverables */}
            {deliverables.length > 0 && (
              <div>
                <h2 className="heading-sm mb-4 text-soft-white">Deliverables</h2>
                <ul className="space-y-2">
                  {deliverables.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-signal-violet flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-graphite">{typeof item === 'string' ? item : item && typeof item === 'object' && 'title' in item && typeof item.title === 'string' ? item.title : 'Project deliverable'}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Results */}
            {results.length > 0 && (
              <div>
                <h2 className="heading-sm mb-4 text-soft-white">Results & Impact</h2>
                <ul className="space-y-2">
                  {results.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-signal-violet flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                        />
                      </svg>
                      <span className="text-graphite">{typeof item === 'string' ? item : item && typeof item === 'object' && 'metric' in item && typeof item.metric === 'string' ? `${item.metric}: ${'value' in item && typeof item.value === 'string' ? item.value : ''}` : 'Project result'}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Gallery */}
            {gallery.length > 0 && (
              <div>
                <h2 className="heading-sm mb-6 text-soft-white">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {gallery.map((imagePath, index) => (
                    <div key={index} className="relative w-full aspect-video rounded-cards overflow-hidden bg-iron">
                      <Image
                        src={imagePath}
                        alt={`${project.title} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* External Link */}
            {project.external_url && (
              <div className="pt-8">
                <a
                  href={project.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-signal-violet hover:text-lavender-mist transition-colors"
                >
                  View Live Project
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Back to Projects */}
      <section className="py-section border-t border-ash/20">
        <Container size="narrow">
          <div className="text-center">
            <Button as="link" href="/projects" variant="ghost">
              ← Back to All Projects
            </Button>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
}
