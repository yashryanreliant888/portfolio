'use client';

import { Container } from '@/components/Container';
import GradientButton from '@/components/kokonutui/gradient-button';
import {
  ExpandableScreen,
  ExpandableScreenContent,
  ExpandableScreenTrigger,
} from '@/components/ui/expandable-screen';
import { ContactOverlay } from '@/components/ContactOverlay';

interface ContactCTASectionProps {
  kicker?: string;
  title?: string;
  description?: string;
  buttonText?: string;
}

export function ContactCTASection({
  kicker = "OPEN FOR COLLABORATION // 2026",
  title = "Have a project in mind? Let's talk.",
  description = "Whether you need full-funnel paid campaigns, high-impact SEO, or data-driven growth strategies, let's connect.",
  buttonText = "Get in touch",
}: ContactCTASectionProps) {
  return (
    <section className="terminal-cta" aria-labelledby="contact-title">
      <Container>
        <div className="terminal-cta__inner">
          <div className="max-w-2xl">
            <p className="terminal-kicker">{kicker}</p>
            <h2 id="contact-title">{title}</h2>
            {description && (
              <p className="mt-4 text-base sm:text-lg text-steel font-whyte font-normal leading-relaxed">
                {description}
              </p>
            )}
          </div>
          <div className="shrink-0">
            <ExpandableScreen layoutId="cta-contact" triggerRadius="999px" contentRadius="24px">
              <ExpandableScreenTrigger className="inline-block">
                <GradientButton
                  type="button"
                  variant="purple"
                  size="lg"
                  className="rounded-full px-8 shadow-[0_0_28px_rgba(175,80,255,0.35)]"
                >
                  <span className="flex items-center gap-2">
                    <span>{buttonText}</span>
                    <span aria-hidden="true">↗</span>
                  </span>
                </GradientButton>
              </ExpandableScreenTrigger>
              <ExpandableScreenContent
                className="bg-[#f0f0f0] text-[#090909]"
                closeButtonClassName="text-[#090909] hover:bg-black/10"
              >
                <ContactOverlay />
              </ExpandableScreenContent>
            </ExpandableScreen>
          </div>
        </div>
      </Container>
    </section>
  );
}
