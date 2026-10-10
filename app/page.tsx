import { createClient } from '@/lib/supabase/server';
import { PageLayout, Container, Button, SectionHeading, SkillBadge, ExperienceCard, CertificationCard } from '@/components';
import Link from 'next/link';

export default async function HomePage() {
  const supabase = await createClient();

  // Fetch profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .single();

  // Fetch featured skills (first 6)
  const { data: skills } = await supabase
    .from('skills')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .limit(6);

  // Fetch published experience
  const { data: experience } = await supabase
    .from('experience')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .limit(2);

  // Fetch published certifications
  const { data: certifications } = await supabase
    .from('certifications')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .limit(3);

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <Container className="py-20">
          <div className="max-w-4xl">
            {/* Name with GrandSlang style */}
            <h1 className="display-xl mb-6 text-almost-white">
              {profile?.full_name || 'Yash Ryan Reliant'}
            </h1>
            
            {/* Headline */}
            <p className="heading text-soft-white mb-8">
              {profile?.headline || 'Digital Marketing Specialist'}
            </p>
            
            {/* Description */}
            <p className="subheading text-steel max-w-2xl mb-12 leading-relaxed">
              Focused on SEO, paid advertising, social media marketing, analytics, 
              and AI-integrated digital marketing. Bringing data-driven strategies 
              and creative execution to help brands grow their online presence.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button as="link" href="/projects" variant="violet" size="lg">
                View My Work
              </Button>
              <Button as="link" href="/contact" variant="filled" size="lg">
                Contact Me
              </Button>
            </div>
            
            {/* Location */}
            {profile?.location && (
              <p className="text-sm text-ash mt-8">
                📍 {profile.location}
              </p>
            )}
          </div>
        </Container>
      </section>

      {/* Professional Snapshot */}
      <section className="py-section border-t border-ash/20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-lg mb-8 text-almost-white">
              Professional Snapshot
            </h2>
            <p className="body text-graphite leading-relaxed">
              Early-career digital marketing professional with hands-on internship 
              experience and advanced training in digital marketing strategies, 
              advertising platforms, marketing analytics, and AI-integrated marketing. 
              Passionate about leveraging data and creativity to deliver measurable results.
            </p>
          </div>
        </Container>
      </section>

      {/* Featured Skills */}
      {skills && skills.length > 0 && (
        <section className="py-section">
          <Container>
            <div className="mb-12">
              <SectionHeading variant="stamp" className="mb-4">
                T O O L S   &   S K I L L S
              </SectionHeading>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {skills.map((skill) => (
                <SkillBadge
                  key={skill.id}
                  name={skill.name}
                  category={skill.category}
                  proficiency={skill.proficiency}
                />
              ))}
            </div>
            
            <div className="text-center">
              <Button as="link" href="/skills" variant="ghost">
                View All Skills
              </Button>
            </div>
          </Container>
        </section>
      )}

      {/* Experience Preview */}
      {experience && experience.length > 0 && (
        <section className="py-section border-t border-ash/20">
          <Container>
            <div className="mb-12">
              <SectionHeading variant="stamp" className="mb-4">
                E X P E R I E N C E
              </SectionHeading>
            </div>
            
            <div className="space-y-6 mb-12">
              {experience.map((exp) => (
                <ExperienceCard
                  key={exp.id}
                  organization={exp.organization}
                  role={exp.role}
                  employmentType={exp.employment_type}
                  durationLabel={exp.duration_label}
                  startDate={exp.start_date}
                  endDate={exp.end_date}
                  description={exp.description}
                />
              ))}
            </div>
            
            <div className="text-center">
              <Button as="link" href="/experience" variant="ghost">
                View Full Experience
              </Button>
            </div>
          </Container>
        </section>
      )}

      {/* Featured Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="py-section">
          <Container>
            <div className="mb-12">
              <SectionHeading variant="stamp" className="mb-4">
                C E R T I F I C A T I O N S
              </SectionHeading>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {certifications.map((cert) => (
                <CertificationCard
                  key={cert.id}
                  title={cert.title}
                  issuer={cert.issuer}
                  category={cert.category}
                  issueDate={cert.issue_date}
                  credentialUrl={cert.credential_url}
                  certificateFilePath={cert.certificate_file_path}
                />
              ))}
            </div>
            
            <div className="text-center">
              <Button as="link" href="/certifications" variant="ghost">
                View All Certifications
              </Button>
            </div>
          </Container>
        </section>
      )}

      {/* Contact CTA */}
      <section className="py-section border-t border-ash/20">
        <Container>
          <div className="card-violet-bloom text-center">
            <h2 className="heading mb-6">Let's Work Together</h2>
            <p className="body-sm text-lavender-mist mb-8 max-w-2xl mx-auto">
              Looking for a digital marketing professional to help grow your brand? 
              I'm available for internships, freelance projects, and full-time opportunities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button as="link" href="/contact" variant="filled" size="lg">
                Get in Touch
              </Button>
              <a
                href={`mailto:${profile?.email || 'yashryanreliant@gmail.com'}`}
                className="btn-filled inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                Email Me
              </a>
            </div>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
}
