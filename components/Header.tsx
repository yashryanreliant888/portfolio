'use client';

import { FormEvent, useState } from 'react';
import { ExpandableScreen, ExpandableScreenContent, ExpandableScreenTrigger, useExpandableScreen } from '@/components/ui/expandable-screen';
import { ContactOverlay } from '@/components/ContactOverlay';
import StaggeredMenu from '@/components/StaggeredMenu';

const StaggeredMenuComponent = StaggeredMenu as any;
const navigation = [
  { label: 'Home', link: '/' }, { label: 'About', link: '/about' }, { label: 'Skills', link: '/skills' },
  { label: 'Experience', link: '/experience' }, { label: 'Certifications', link: '/certifications' },
  { label: 'Education', link: '/education' }, { label: 'Projects', link: '/projects' },
  { label: 'Gallery', link: '/gallery' }, { label: 'Contact', link: '/contact' },
];

function Logo() {
  return <div className="terminal-brand flex items-center gap-3" aria-label="Yash Ryan Reliant home">
    <span className="terminal-brand__mark" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" role="presentation">
      <path d="M7 7v18M7 7l9 9m0 0 9-9m-9 9v9" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M21 16h4" stroke="var(--color-signal-violet)" strokeWidth="2" strokeLinecap="square" /><circle cx="25" cy="16" r="1.6" fill="var(--color-signal-violet)" />
    </svg></span><span className="terminal-brand__name">YASH<span>RYAN</span></span>
  </div>;
}

export function Header() {
  return <ExpandableScreen layoutId="header-contact" triggerRadius="999px" contentRadius="24px"><HeaderNavigation /></ExpandableScreen>;
}

function HeaderNavigation() {
  const { expand } = useExpandableScreen();
  const menuItems = navigation.map((item) => item.label === 'Contact' ? { ...item, onClick: expand } : item);

  return <StaggeredMenuComponent isFixed position="right" items={menuItems} colors={['#15142b', '#090909']} accentColor="#af50ff" menuButtonColor="#f7f9fa" openMenuButtonColor="#f7f9fa" logoContent={<Logo />} extraContent={<>
    <ExpandableScreenTrigger className="terminal-nav-cta"><span>LET&apos;S TALK ↗</span></ExpandableScreenTrigger>
    <ExpandableScreenContent className="bg-[#f0f0f0] text-[#090909]" closeButtonClassName="text-[#090909] hover:bg-black/10"><ContactOverlay /></ExpandableScreenContent>
  </>} />;
}

