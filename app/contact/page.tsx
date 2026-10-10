import { PageLayout, Container, SectionHeading } from '@/components';
import { ContactForm } from './ContactForm';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Contact | Yash Ryan Reliant',
  description: 'Get in touch with Yash Ryan Reliant for digital marketing opportunities, collaborations, and inquiries.',
};

export default async function ContactPage() {
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from('profiles')
    .select('email, location, linkedin_url')
    .single();

  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-section">
        <Container size="narrow">
          <h1 className="display mb-8 text-almost-white">Get in Touch</h1>
          <p className="subheading text-steel leading-relaxed">
            I'm open to internships, freelance projects, and full-time opportunities 
            in digital marketing. Let's discuss how I can help grow your brand.
          </p>
        </Container>
      </section>

      {/* Contact Methods */}
      <section className="py-section border-t border-ash/20">
        <Container size="narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Email */}
            {profile?.email && (
              <div className="card border border-ash/20 p-8">
                <div className="flex items-start gap-4">
                  <svg
                    className="w-8 h-8 text-signal-violet flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  <div>
                    <h3 className="text-lg font-medium text-soft-white mb-2">Email</h3>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-graphite hover:text-signal-violet transition-colors break-all"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Location */}
            {profile?.location && (
              <div className="card border border-ash/20 p-8">
                <div className="flex items-start gap-4">
                  <svg
                    className="w-8 h-8 text-signal-violet flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  <div>
                    <h3 className="text-lg font-medium text-soft-white mb-2">Location</h3>
                    <p className="text-graphite">{profile.location}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* LinkedIn */}
          {profile?.linkedin_url && (
            <div className="text-center mb-12">
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-signal-violet hover:text-lavender-mist transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Connect on LinkedIn
              </a>
            </div>
          )}

          {/* Contact Form */}
          <div>
            <SectionHeading variant="stamp" className="mb-8 text-center">
              S E N D   A   M E S S A G E
            </SectionHeading>
            <ContactForm />
          </div>
        </Container>
      </section>

      {/* Quick Response Note */}
      <section className="py-section border-t border-ash/20">
        <Container size="narrow">
          <div className="card border border-ash/20 p-8 text-center">
            <h3 className="heading-sm mb-4 text-soft-white">Response Time</h3>
            <p className="body text-graphite">
              I aim to respond to all inquiries within 24-48 hours. For urgent matters, 
              please reach out via email directly.
            </p>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
}
