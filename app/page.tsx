import { createClient } from '@/lib/supabase/server';
import { PageLayout } from '@/components/PageLayout';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import GradientButton from '@/components/kokonutui/gradient-button';
import { CertificationCard } from '@/components/CertificationCard';
import { EntranceAnimation } from '@/components/EntranceAnimation';
import { SocialIcon } from '@/components/SocialIcon';
import Link from 'next/link';
import Image from 'next/image';
import mainPic from '@/main-pic.png';
import heroBackground from '@/hero_bg.png';
import { Skiper28 } from '@/components/ui/skiper-ui/skiper28';
import { Skiper19 } from '@/components/ui/skiper-ui/skiper19';
import { Skiper31 } from '@/components/ui/skiper-ui/skiper31';

export default async function HomePage() {
  const supabase = await createClient();
  const [{ data: profile }, { data: skills }, { data: certifications }] = await Promise.all([
    supabase.from('profiles').select('*').single(),
    supabase.from('skills').select('*').eq('is_active', true).order('sort_order').limit(6),
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
            <div className="terminal-hero__actions au-enter au-soft">
              <GradientButton
                href="/projects"
                variant="purple"
                size="md"
                className="rounded-full px-7 shadow-[0_0_24px_rgba(175,80,255,0.35)] shrink-0"
              >
                <span className="inline-flex items-center gap-2 whitespace-nowrap">
                  <span>Inspect the work</span>
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </span>
              </GradientButton>
              <Link
                href="/contact"
                className="terminal-text-link group inline-flex items-center gap-2 whitespace-nowrap shrink-0 py-2.5 transition-colors duration-200 hover:text-lavender-mist"
              >
                <span>Start a conversation</span>
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          <div className="hero-stage" aria-label="Portrait of Yash Ryan Reliant">
          <div className="hero-stage__halo" aria-hidden="true" />
          <div className="hero-stage__portrait"><Image src={mainPic} alt={`${name} portrait`} fill priority quality={100} sizes="(max-width: 700px) 88vw, 760px" /></div>
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

    <Skiper28 about="I'm a digital marketing professional based in Kerala, India. I combine SEO, paid media, content, and analytics to turn clear strategy into measurable growth." />

    <Skiper19 />

    <Skiper31 skills={(skills || []).map((skill) => ({ name: skill.name, logoPath: skill.logo_path, icon: skill.icon }))} />

    <section className="terminal-section terminal-comparison" aria-labelledby="comparison-title">
      <Container>
        <div className="terminal-section__heading"><h2 id="comparison-title">How the signal moves</h2><p>Strategy is only useful when it lands in the real world.</p></div>
        <div className="comparison-rail">
          {['Find the opening', 'Build the system', 'Measure the lift'].map((title, index) => <article className={`comparison-ticket comparison-ticket--${index + 1}`} key={title}><span className="comparison-ticket__eyebrow">0{index + 1} / FIELD NOTE</span><h3>{title}</h3><p>{[skills?.[0]?.name || 'SEO foundations', skills?.[1]?.name || 'Campaign architecture', skills?.[2]?.name || 'Marketing analytics'][index]}</p><Link href="/projects">Explore <span aria-hidden="true">→</span></Link></article>)}
        </div>
      </Container>
    </section>

    {certifications && certifications.length > 0 && <section className="terminal-section border-t border-white/10" aria-labelledby="credentials-title"><Container><div className="terminal-section__heading"><h2 id="credentials-title">Credentials on file</h2><Link href="/certifications" className="terminal-text-link">Open archive →</Link></div><div className="grid gap-6 md:grid-cols-3">{certifications.map((cert) => <CertificationCard key={cert.id} title={cert.title} issuer={cert.issuer} category={cert.category} issueDate={cert.issue_date} credentialUrl={cert.verification_url} certificateFilePath={cert.public_path} fileType={cert.file_type} />)}</div></Container></section>}

    <section className="terminal-cta" aria-labelledby="contact-title"><Container><div className="terminal-cta__inner"><div><p className="terminal-kicker">NEXT FLIGHT / OPEN</p><h2 id="contact-title">Have a signal worth sending?</h2></div><GradientButton href="/contact" variant="purple" size="lg" className="rounded-full px-8">Get in touch <span aria-hidden="true">↗</span></GradientButton></div></Container></section>
  </PageLayout>;
}
