import { createClient } from '@/lib/supabase/server';
import { PageLayout, Container, SectionHeading, ProjectCard, EmptyState } from '@/components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects & Case Studies | Yash Ryan Reliant',
  description: 'Digital marketing projects, campaigns, and case studies showcasing SEO, paid advertising, social media, and analytics work.',
};

export default async function ProjectsPage() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('is_published', true)
    .order('is_featured', { ascending: false })
    .order('sort_order', { ascending: true });

  const featuredProjects = projects?.filter(p => p.is_featured) || [];
  const otherProjects = projects?.filter(p => !p.is_featured) || [];

  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-section">
        <Container>
          <h1 className="display mb-8 text-almost-white">Projects</h1>
          <p className="subheading text-steel max-w-3xl leading-relaxed">
            Marketing campaigns, SEO audits, analytics dashboards, and content projects 
            that demonstrate strategic thinking and measurable results.
          </p>
        </Container>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-section border-t border-ash/20">
          <Container>
            <SectionHeading variant="stamp" className="mb-8">
              F E A T U R E D   P R O J E C T S
            </SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  slug={project.slug}
                  category={project.category}
                  summary={project.summary}
                  coverImagePath={project.cover_image_path}
                  isFeatured={project.is_featured}
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* All Projects */}
      {otherProjects.length > 0 && (
        <section className="py-section border-t border-ash/20">
          <Container>
            {featuredProjects.length > 0 && (
              <SectionHeading variant="stamp" className="mb-8">
                A L L   P R O J E C T S
              </SectionHeading>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  slug={project.slug}
                  category={project.category}
                  summary={project.summary}
                  coverImagePath={project.cover_image_path}
                  isFeatured={project.is_featured}
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Empty State */}
      {!projects || projects.length === 0 && (
        <section className="py-section border-t border-ash/20">
          <Container>
            <EmptyState
              title="Projects coming soon"
              description="Case studies and campaign portfolios will be published here as work progresses."
              icon={
                <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              }
            />
          </Container>
        </section>
      )}

      {/* Note about projects */}
      <section className="py-section border-t border-ash/20">
        <Container size="narrow">
          <div className="card border border-ash/20 p-8">
            <h2 className="heading-sm mb-4 text-soft-white">About These Projects</h2>
            <p className="body text-graphite leading-relaxed">
              Each project represents real marketing work - whether from internships, 
              client engagements, or personal initiatives. I focus on documenting 
              strategy, execution, and measurable outcomes to demonstrate both creative 
              thinking and analytical rigor.
            </p>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
}
