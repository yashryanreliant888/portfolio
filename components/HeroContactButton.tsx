'use client';

import {
  ExpandableScreen,
  ExpandableScreenContent,
  ExpandableScreenTrigger,
} from '@/components/ui/expandable-screen';
import { ContactOverlay } from '@/components/ContactOverlay';

export function HeroContactButton() {
  return (
    <ExpandableScreen
      layoutId="hero-contact-modal"
      triggerRadius="999px"
      contentRadius="24px"
    >
      <ExpandableScreenTrigger>
        <button
          type="button"
          className="terminal-text-link group inline-flex items-center gap-2 whitespace-nowrap shrink-0 py-2.5 transition-colors duration-200 hover:text-lavender-mist bg-transparent border-0 cursor-pointer font-inherit"
        >
          <span>Start a conversation</span>
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-1"
          >
            →
          </span>
        </button>
      </ExpandableScreenTrigger>
      <ExpandableScreenContent
        className="bg-[#f0f0f0] text-[#090909]"
        closeButtonClassName="text-[#090909] hover:bg-black/10"
      >
        <ContactOverlay />
      </ExpandableScreenContent>
    </ExpandableScreen>
  );
}
