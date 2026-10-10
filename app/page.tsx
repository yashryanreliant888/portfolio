import { createClient } from '@/lib/supabase/server';
import { PageLayout } from '@/components/PageLayout';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { ExperienceCard } from '@/components/ExperienceCard';
import { CertificationCard } from '@/components/CertificationCard';
import { EntranceAnimation } from '@/components/EntranceAnimation';
import { SocialIcon } from '@/components/SocialIcon';
import Link from 'next/link';
import Image from 'next/image';
import mainPic from '@/main-pic.png';
import heroBackground from '@/hero_bg.png';

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
    <section className="terminal-hero terminal-hero--centered" aria-labelledby="hero-title">
      <div className="terminal-hero__background" aria-hidden="true"><Image src={heroBackground} alt="" fill priority sizes="100vw" /></div>
      <div className="terminal-hero__wash" aria-hidden="true" />
      <EntranceAnimation>
        <Container className="relative z-10 py-10 lg:py-12">
          <div className="hero-layout">
          <div className="hero-intro">
            <p className="terminal-kicker au-enter au-soft">YASH RYAN RELIANT / DIGITAL MARKETING</p>
            <h1 id="hero-title" className="au-headline"><span className="au-enter au-rise">Ideas that</span><em className="au-enter au-rise">move</em><strong className="au-enter au-rise">people.</strong></h1>
            <p className="terminal-hero__intro au-enter au-soft">{headline}. Search, story, and signal brought together into marketing that moves with intent.</p>
            <div className="terminal-hero__actions au-enter au-soft"><Button as="link" href="/projects" variant="violet" size="lg">Inspect the work <span aria-hidden="true" className="button-arrow">↗</span></Button><Link href="/contact" className="terminal-text-link">Start a conversation <span aria-hidden="true" className="text-arrow">→</span></Link></div>
          </div>

          <div className="hero-stage" aria-label="Portrait of Yash Ryan Reliant">
          <div className="hero-stage__halo" aria-hidden="true" />
          <div className="hero-stage__portrait"><Image src={mainPic} alt={`${name} portrait`} fill priority sizes="(max-width: 700px) 88vw, 470px" /></div>
          <div className="hero-float hero-float--left"><span className="hero-float__label">FOCUS / 01</span><strong>Find the opening.</strong><span>Audience, insight, direction.</span></div>
          <div className="hero-float hero-float--right"><span className="hero-float__label">CURRENTLY</span><strong>Building momentum.</strong><span>SEO · PAID · ANALYTICS</span></div>
          <div className="hero-float hero-float--bottom"><span>KERALA, INDIA</span><span className="hero-float__rule" /><span>OPEN TO GOOD WORK</span></div>
          </div>
          <aside className="hero-proof hero-proof--top au-enter au-soft"><strong>SEARCH + STORY</strong><p>Turning audience insight into clear, useful marketing that earns attention.</p></aside>
          <aside className="hero-proof hero-proof--bottom au-enter au-soft"><strong>SEO · PAID · ANALYTICS</strong><p>Strategy, content, and measurement working as one signal.</p></aside>
          <div className="hero-bio au-enter au-soft">
            <p>I help brands find their clearest message, build momentum, and make every campaign count.</p>
            <div className="hero-socials" aria-label="Social links">
              {[
                ['linkedin', profile?.linkedin_url],
                ['instagram', profile?.instagram_url],
                ['facebook', profile?.facebook_url],
                ['youtube', profile?.youtube_url],
              ].filter(([, url]) => Boolean(url)).map(([platform, url]) => <a key={platform} href={url || '#'} target="_blank" rel="noopener noreferrer" aria-label={platform}><SocialIcon platform={platform as 'linkedin' | 'instagram' | 'facebook' | 'youtube'} className="h-4 w-4" /></a>)}
            </div>
          </div>
          <div className="hero-capability-rail" aria-label="Capabilities">
            {['SEO', 'Paid media', 'Content', 'Social', 'Analytics', 'AI-integrated marketing'].map((item) => <span key={item}>{item}</span>)}
          </div>
          </div>
        </Container>
      </EntranceAnimation>
      <div className="terminal-coordinate" aria-hidden="true"><span>FIELD NOTES / PORTFOLIO 2026</span><span>09.9312° N &nbsp; 76.2673° E</span></div>
    </section>

    <section className="terminal-section terminal-comparison" aria-labelledby="comparison-title">
      <Container>
        <div className="terminal-section__heading"><h2 id="comparison-title">How the signal moves</h2><p>Strategy is only useful when it lands in the real world.</p></div>
        <div className="comparison-rail">
          {['Find the opening', 'Build the system', 'Measure the lift'].map((title, index) => <article className={`comparison-ticket comparison-ticket--${index + 1}`} key={title}><span className="comparison-ticket__eyebrow">0{index + 1} / FIELD NOTE</span><h3>{title}</h3><p>{[skills?.[0]?.name || 'SEO foundations', skills?.[1]?.name || 'Campaign architecture', skills?.[2]?.name || 'Marketing analytics'][index]}</p><Link href="/projects">Explore <span aria-hidden="true">→</span></Link></article>)}
        </div>
      </Container>
    </section>

    {experience && experience.length > 0 && <section className="terminal-section border-t border-white/10" aria-labelledby="experience-title"><Container><div className="terminal-section__heading"><h2 id="experience-title">Recent departures</h2><Link href="/experience" className="terminal-text-link">View timeline →</Link></div><div className="space-y-6">{experience.map((exp) => <ExperienceCard key={exp.id} organization={exp.organization} role={exp.role} employmentType={exp.employment_type} durationLabel={exp.duration_label} startDate={exp.start_date} endDate={exp.end_date} description={exp.description} />)}</div></Container></section>}

    {certifications && certifications.length > 0 && <section className="terminal-section border-t border-white/10" aria-labelledby="credentials-title"><Container><div className="terminal-section__heading"><h2 id="credentials-title">Credentials on file</h2><Link href="/certifications" className="terminal-text-link">Open archive →</Link></div><div className="grid gap-6 md:grid-cols-3">{certifications.map((cert) => <CertificationCard key={cert.id} title={cert.title} issuer={cert.issuer} category={cert.category} issueDate={cert.issue_date} credentialUrl={cert.verification_url} certificateFilePath={cert.public_path} fileType={cert.file_type} />)}</div></Container></section>}

    <section className="terminal-cta" aria-labelledby="contact-title"><Container><div className="terminal-cta__inner"><div><p className="terminal-kicker">NEXT FLIGHT / OPEN</p><h2 id="contact-title">Have a signal worth sending?</h2></div><Button as="link" href="/contact" variant="filled" size="lg">Get in touch <span aria-hidden="true">↗</span></Button></div></Container></section>
  </PageLayout>;
}
