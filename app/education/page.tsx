import { createClient } from '@/lib/supabase/server';
import { PageLayout, Container, SectionHeading, EducationCard, EmptyState } from '@/components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Education | Yash Ryan Reliant',
  description: 'Academic background including B.Com in Cooperation from SN Open University and professional training in digital marketing.',
};

export default async function EducationPage() {
  const supabase = await createClient();

  const { data: education } = await supabase
    .from('education')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });

  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-section">
        <Container>
          <h1 className="display mb-8 text-almost-white">Education</h1>
          <p className="subheading text-steel max-w-3xl leading-relaxed">
            Academic foundation and specialized training that supports my digital 
            marketing practice and strategic thinking.
          </p>
        </Container>
      </section>

      {/* Education Timeline */}
      <section className="py-section border-t border-ash/20">
        <Container>
          {education && education.length > 0 ? (
            <div className="space-y-6">
              {education.map((edu) => (
                <EducationCard
                  key={edu.id}
                  qualification={edu.qualification}
                  institution={edu.institution}
                  fieldOfStudy={edu.field_of_study}
                  studyStart={edu.study_start}
                  studyEnd={edu.study_end}
                  grade={edu.grade}
                  description={edu.description}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No education records yet"
              description="Academic qualifications and training will be displayed here."
              icon={
                <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              }
            />
          )}
        </Container>
      </section>

      {/* Learning Philosophy */}
      <section className="py-section border-t border-ash/20">
        <Container size="narrow">
          <div className="card border border-ash/20 p-8">
            <h2 className="heading-sm mb-4 text-soft-white">Beyond the Classroom</h2>
            <p className="body text-graphite leading-relaxed mb-4">
              Formal education provides the foundation, but digital marketing mastery 
              comes from continuous hands-on practice, experimentation, and staying 
              current with industry trends and platform updates.
            </p>
            <p className="body text-graphite leading-relaxed">
              I complement my academic background with ongoing professional development, 
              certifications, self-directed learning, and real-world project work to 
              ensure my skills remain relevant and effective.
            </p>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
}
