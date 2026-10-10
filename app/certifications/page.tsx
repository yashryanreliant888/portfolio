import { createClient } from '@/lib/supabase/server';
import { PageLayout } from '@/components/PageLayout';
import { Container } from '@/components/Container';
import { SectionHeading } from '@/components/SectionHeading';
import { CertificationCard } from '@/components/CertificationCard';
import { EmptyState } from '@/components/EmptyState';
import type { Metadata } from 'next';
import type { Database } from '@/lib/database.types';

type Certification = Database['public']['Tables']['certifications']['Row'];

export const metadata: Metadata = {
  title: 'Certifications | Yash Ryan Reliant',
  description: 'Professional certifications in digital marketing including Advanced Digital Marketing from IPCS Global and AI Integrated Digital Marketing from TETSKILLS.',
};

export default async function CertificationsPage() {
  const supabase = await createClient();

  const { data: certifications, error } = await supabase
    .from('certifications')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true });
  const certificationList = certifications ?? [];

  // Group by category
  const certsByCategory = certificationList.reduce((acc, cert: Certification) => {
    const category = cert.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(cert);
    return acc;
  }, {} as Record<string, Certification[]>);

  const categories = certsByCategory ? Object.keys(certsByCategory).sort() : [];

  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-section">
        <Container>
          <h1 className="display mb-8 text-almost-white">Certifications</h1>
          <p className="subheading text-steel max-w-3xl leading-relaxed">
            Continuous learning through advanced courses and professional certifications 
            in digital marketing, AI integration, and marketing technology.
          </p>
        </Container>
      </section>

      {/* Certifications Grid */}
      <section className="py-section border-t border-ash/20">
        <Container>
          {certificationList.length > 0 ? (
            <div className="space-y-16">
              {categories.map((category) => (
                <div key={category}>
                  <SectionHeading variant="stamp" className="mb-8">
                    {category.toUpperCase().replace(/ /g, '   ')}
                  </SectionHeading>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certsByCategory[category].map((cert: Certification) => (
                      <CertificationCard
                        key={cert.id}
                        title={cert.title}
                        issuer={cert.issuer}
                        category={cert.category}
                        issueDate={cert.issue_date}
                        expiryDate={cert.expiry_date}
                        credentialId={cert.credential_id}
                        credentialUrl={cert.verification_url}
                        certificateFilePath={cert.public_path}
                        fileType={cert.file_type}
                        skillsCovered={cert.skills_covered}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No certifications yet"
              description="Professional certifications and credentials will be displayed here."
              icon={
                <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              }
            />
          )}
        </Container>
      </section>

      {/* Commitment to Learning */}
      <section className="py-section border-t border-ash/20">
        <Container size="narrow">
          <div className="card border border-ash/20 p-8">
            <h2 className="heading-sm mb-4 text-soft-white">Commitment to Continuous Learning</h2>
            <p className="body text-graphite leading-relaxed">
              The digital marketing landscape evolves constantly. I stay current through 
              ongoing education, industry certifications, and hands-on experimentation 
              with new tools and strategies. Each certification represents practical 
              skills I can apply to real-world marketing challenges.
            </p>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
}
