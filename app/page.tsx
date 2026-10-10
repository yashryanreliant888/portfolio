import { createClient } from '@/lib/supabase/server';
import { PageLayout, Container, Button, ExperienceCard, CertificationCard } from '@/components';
import Link from 'next/link';
import Image from 'next/image';

export default async function HomePage() {
  const supabase = await createClient();
  const [{ data: profile }, { data: skills }, { data: experience }, { data: certifications }] = await Promise.all([
    supabase.from('profiles').select('*').single(),
    supabase.from('skills').select('*').eq('is_active', true).order('sort_order').limit(6),
    supabase.from('experience').select('*').eq('is_published', true).order('sort_order').limit(2),
    supabase.from('certifications').select('*').eq('is_published', true).order('sort_order').limit(3),
  ]);

  const name = profile?.full_name || 'Yash Ryan Reliant';
  const headline = profile?.headline || 'Digital Marketing Specialist';

  return <PageLayout>
    <section className="terminal-hero" aria-labelledby="hero-title">
      <div className="terminal-hero__wash" aria-hidden="true" />
      <Container className="relative z-10 py-16 lg:py-20">
        <div className="terminal-hero__grid">
          <div className="terminal-hero__copy">
            <p className="terminal-kicker">YASH RYAN RELIANT / DIGITAL MARKETING</p>
            <h1 id="hero-title"><span>{name.split(' ')[0]} <em>builds</em></span><strong>momentum</strong><span className="hero-outline">for ambitious brands.</span></h1>
            <p className="terminal-hero__intro">{headline}. Search, story, and signal — brought together into marketing that moves with intent.</p>
            <div className="terminal-hero__actions"><Button as="link" href="/projects" variant="violet" size="lg">Inspect the work <span aria-hidden="true">↗</span></Button><Link href="/contact" className="terminal-text-link">Start a conversation <span aria-hidden="true">→</span></Link></div>
            <div className="terminal-hero__meta"><span><i aria-hidden="true">+</i> Kerala, India</span><span>SEO · PAID · ANALYTICS</span></div>
          </div>
          <div className="boarding-pass boarding-pass--hero" aria-label="Profile introduction">
            <div className="boarding-pass__top"><span>BOARDING PASS / 001</span><span aria-hidden="true">✳</span></div>
            <div className="boarding-pass__portrait"><Image src="/main-pic.png" alt={`${name} portrait`} fill priority sizes="(max-width: 900px) 90vw, 38vw" /></div>
            <div className="boarding-pass__route"><div><small>ORIGIN</small><strong>INSIGHT</strong></div><span aria-hidden="true">→</span><div><small>DESTINATION</small><strong>IMPACT</strong></div></div>
            <div className="boarding-pass__bottom"><span>READY FOR DEPARTURE</span><span className="boarding-pass__barcode" aria-hidden="true">▥▥▥▥</span></div>
          </div>
        </div>
      </Container>
      <div className="terminal-coordinate" aria-hidden="true"><span>+ &nbsp; FIELD NOTES / PORTFOLIO 2026</span><span>09.9312° N &nbsp; 76.2673° E &nbsp; ♥</span></div>
    </section>

    <section className="terminal-section terminal-comparison" aria-labelledby="comparison-title">
      <Container>
        <div className="terminal-section__heading"><h2 id="comparison-title">How the signal moves <span aria-hidden="true">⌁</span></h2><p>Strategy is only useful when it lands in the real world.</p></div>
        <div className="comparison-rail">
          {['Find the opening', 'Build the system', 'Measure the lift'].map((title, index) => <article className={`comparison-ticket comparison-ticket--${index + 1}`} key={title}><span className="comparison-ticket__eyebrow">0{index + 1} / FIELD NOTE</span><h3>{title}</h3><p>{[skills?.[0]?.name || 'SEO foundations', skills?.[1]?.name || 'Campaign architecture', skills?.[2]?.name || 'Marketing analytics'][index]}</p><Link href="/projects">Explore <span aria-hidden="true">→</span></Link></article>)}
        </div>
      </Container>
    </section>

    {experience && experience.length > 0 && <section className="terminal-section border-t border-white/10" aria-labelledby="experience-title"><Container><div className="terminal-section__heading"><h2 id="experience-title">Recent departures</h2><Link href="/experience" className="terminal-text-link">View timeline →</Link></div><div className="space-y-6">{experience.map((exp) => <ExperienceCard key={exp.id} organization={exp.organization} role={exp.role} employmentType={exp.employment_type} durationLabel={exp.duration_label} startDate={exp.start_date} endDate={exp.end_date} description={exp.description} />)}</div></Container></section>}

    {certifications && certifications.length > 0 && <section className="terminal-section border-t border-white/10" aria-labelledby="credentials-title"><Container><div className="terminal-section__heading"><h2 id="credentials-title">Credentials on file</h2><Link href="/certifications" className="terminal-text-link">Open archive →</Link></div><div className="grid gap-6 md:grid-cols-3">{certifications.map((cert) => <CertificationCard key={cert.id} title={cert.title} issuer={cert.issuer} category={cert.category} issueDate={cert.issue_date} credentialUrl={cert.verification_url} certificateFilePath={cert.public_path} />)}</div></Container></section>}

    <section className="terminal-cta" aria-labelledby="contact-title"><Container><div className="terminal-cta__inner"><div><p className="terminal-kicker">NEXT FLIGHT / OPEN</p><h2 id="contact-title">Have a signal worth sending?</h2></div><Button as="link" href="/contact" variant="filled" size="lg">Get in touch <span aria-hidden="true">↗</span></Button></div></Container></section>
  </PageLayout>;
}
