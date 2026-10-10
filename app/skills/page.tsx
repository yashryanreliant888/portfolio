import { createClient } from '@/lib/supabase/server';
import { PageLayout } from '@/components/PageLayout';
import { Container } from '@/components/Container';
import { SectionHeading } from '@/components/SectionHeading';
import { SkillBadge } from '@/components/SkillBadge';
import { EmptyState } from '@/components/EmptyState';
import type { Metadata } from 'next';
import type { Database } from '@/lib/database.types';

type Skill = Database['public']['Tables']['skills']['Row'];

export const metadata: Metadata = {
  title: 'Skills & Tools | Yash Ryan Reliant',
  description: 'Explore my digital marketing skills and tools including Google Analytics, SEMrush, HubSpot, Google Ads, Meta Ads, and more.',
};

export default async function SkillsPage() {
  const supabase = await createClient();

  const { data: skills } = await supabase
    .from('skills')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });
  const skillList = skills ?? [];

  // Group skills by category
  const skillsByCategory = skillList.reduce((acc, skill: Skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categories = skillsByCategory ? Object.keys(skillsByCategory).sort() : [];

  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-section">
        <Container>
          <h1 className="display mb-8 text-almost-white">Skills & Tools</h1>
          <p className="subheading text-steel max-w-3xl leading-relaxed">
            A comprehensive toolkit for modern digital marketing - from analytics 
            and SEO to paid advertising and content creation.
          </p>
        </Container>
      </section>

      {/* Skills Grid */}
      <section className="py-section border-t border-ash/20">
        <Container>
          {skillList.length > 0 ? (
            <div className="space-y-16">
              {categories.map((category) => (
                <div key={category}>
                  <SectionHeading variant="stamp" className="mb-8">
                    {category.toUpperCase().replace(/ /g, '   ')}
                  </SectionHeading>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillsByCategory[category].map((skill: Skill) => (
                      <SkillBadge
                        key={skill.id}
                        name={skill.name}
                        category={skill.category}
                        proficiency={skill.proficiency}
                        logoPath={skill.logo_path}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No skills added yet"
              description="Check back soon for an updated list of skills and tools."
              icon={
                <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                </svg>
              }
            />
          )}
        </Container>
      </section>

      {/* Proficiency Legend */}
      {skills && skills.some(s => s.proficiency) && (
        <section className="py-section border-t border-ash/20">
          <Container size="narrow">
            <div className="card border border-ash/20 p-8">
              <h3 className="heading-sm mb-4 text-soft-white">Proficiency Levels</h3>
              <div className="space-y-2 text-sm text-graphite">
                <p><strong className="text-almost-white">Beginner:</strong> Foundational knowledge and hands-on practice</p>
                <p><strong className="text-almost-white">Intermediate:</strong> Practical experience and proven results</p>
                <p><strong className="text-almost-white">Advanced:</strong> Deep expertise and strategic implementation</p>
              </div>
            </div>
          </Container>
        </section>
      )}
    </PageLayout>
  );
}
