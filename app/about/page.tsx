import { createClient } from '@/lib/supabase/server';
import { PageLayout } from '@/components/PageLayout';
import { Container } from '@/components/Container';
import { SectionHeading } from '@/components/SectionHeading';
import { Button } from '@/components/Button';
import GradientButton from '@/components/kokonutui/gradient-button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Yash Ryan Reliant',
  description: 'Learn more about Yash Ryan Reliant - Digital Marketing Specialist with expertise in SEO, paid advertising, social media, and analytics.',
};

export default async function AboutPage() {
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .single();

  const specializations = [
    'Search Engine Optimization',
    'Paid Advertising',
    'Social Media Marketing',
    'Marketing Analytics',
    'Email Marketing',
    'AI-Integrated Digital Marketing',
    'Marketing Content Creation',
    'Website Management',
  ];

  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-section">
        <Container size="narrow">
          <h1 className="display mb-8 text-almost-white">About Me</h1>
          <p className="subheading text-steel leading-relaxed">
            Digital marketing professional passionate about creating data-driven 
            strategies that deliver measurable results and meaningful connections 
            with audiences.
          </p>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-section border-t border-ash/20">
        <Container size="narrow">
          <div className="space-y-8">
            {/* Biography */}
            {profile?.biography ? (
              <div>
                <h2 className="heading-sm mb-4 text-soft-white">My Journey</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="body text-graphite leading-relaxed whitespace-pre-line">
                    {profile.biography}
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="heading-sm mb-4 text-soft-white">My Journey</h2>
                <p className="body text-graphite leading-relaxed">
                  I'm an early-career digital marketing professional based in Kerala, India, 
                  with a strong foundation in modern marketing strategies and tools. Through 
                  hands-on internship experiences and advanced training, I've developed expertise 
                  in SEO, paid advertising campaigns, social media marketing, and data analytics.
                </p>
                <p className="body text-graphite leading-relaxed mt-4">
                  What drives me is the intersection of creativity and data - using analytics 
                  to inform strategy while maintaining the human connection that makes marketing 
                  effective. I'm particularly interested in how AI and automation can enhance 
                  (not replace) the marketer's ability to understand and serve their audience.
                </p>
              </div>
            )}

            {/* Specializations */}
            <div>
              <h2 className="heading-sm mb-6 text-soft-white">Areas of Expertise</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {specializations.map((spec) => (
                  <div
                    key={spec}
                    className="flex items-start gap-3 p-4 border border-ash/20 rounded-buttons hover:border-signal-violet/30 transition-colors duration-200"
                  >
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
                    <span className="text-sm text-graphite">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="card border border-ash/20 p-8">
              <h2 className="heading-sm mb-4 text-soft-white">Get in Touch</h2>
              <div className="space-y-3">
                {profile?.email && (
                  <div className="flex items-center gap-3 text-graphite">
                    <svg className="w-5 h-5 text-steel" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <a href={`mailto:${profile.email}`} className="hover:text-signal-violet transition-colors">
                      {profile.email}
                    </a>
                  </div>
                )}
                {profile?.location && (
                  <div className="flex items-center gap-3 text-graphite">
                    <svg className="w-5 h-5 text-steel" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <span>{profile.location}</span>
                  </div>
                )}
                {profile?.linkedin_url && (
                  <div className="flex items-center gap-3 text-graphite">
                    <svg className="w-5 h-5 text-steel" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="hover:text-signal-violet transition-colors">
                      LinkedIn Profile
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center pt-8">
              <GradientButton href="/contact" variant="purple" size="lg" className="rounded-full px-8">
                Let&apos;s Connect <span aria-hidden="true">↗</span>
              </GradientButton>
            </div>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
}
