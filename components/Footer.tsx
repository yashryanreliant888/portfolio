'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SocialIcon, SocialPlatform } from './SocialIcon';

const navigationLinks = [
  { name: 'About', href: '/about' },
  { name: 'Skills', href: '/skills' },
  { name: 'Experience', href: '/experience' },
  { name: 'Certifications', href: '/certifications' },
  { name: 'Education', href: '/education' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

const specializations = [
  'Search Engine Optimization',
  'Paid Advertising',
  'Social Media Marketing',
  'Marketing Analytics',
  'Email Marketing',
  'AI-Integrated Marketing',
];

const socialLinks: { platform: SocialPlatform; href: string; label: string }[] = [
  { platform: 'linkedin', href: 'https://www.linkedin.com/in/yourprofile/', label: 'LinkedIn' },
  { platform: 'instagram', href: 'https://www.instagram.com/yourprofile/', label: 'Instagram' },
  { platform: 'youtube', href: 'https://youtube.com', label: 'YouTube' },
  { platform: 'x', href: 'https://x.com', label: 'X (Twitter)' },
  { platform: 'github', href: 'https://github.com', label: 'GitHub' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [specializationsExpanded, setSpecializationsExpanded] = useState(false);

  return (
    <footer className="terminal-footer mt-section">
      <div className="max-w-[1240px] mx-auto">
        {/* Main Signal Violet Feature Card */}
        <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-[#af50ff] text-[#090909] p-8 sm:p-12 lg:p-16 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            {/* Left Column: Heading, CTA Button & Huge Geometric Logo Mark */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal leading-[1.22] tracking-tight text-[#090909] font-whyte max-w-md">
                  Digital marketing is intricate. Reaching me isn&apos;t.
                  <span className="block mt-1 text-[#090909]/80">Contact Yash anytime.</span>
                </h2>

                <div className="mt-7 flex flex-wrap items-center gap-3.5">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-lg bg-[#090909] px-6 py-3.5 text-sm font-medium text-[#f7f9fa] transition-all duration-200 hover:bg-[#1f1f22] hover:scale-[1.02] active:scale-[0.98] shadow-sm font-whyte"
                  >
                    Get in touch
                  </Link>
                  <a
                    href="mailto:yashryanreliant@gmail.com"
                    className="inline-flex items-center px-2 py-2 text-sm text-[#090909]/80 hover:text-[#090909] font-mono tracking-tight transition-colors"
                  >
                    yashryanreliant@gmail.com
                  </a>
                </div>
              </div>

              {/* Massive Geometric Brand Logo Mark (Inspired by ON reference layout) */}
              <div className="mt-14 lg:mt-20 pt-4">
                <div className="flex flex-col items-start gap-2.5">
                  <svg
                    viewBox="0 0 280 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full max-w-[260px] sm:max-w-[300px] h-auto text-[#090909]"
                    aria-label="Yash Ryan brand monogram"
                    role="img"
                  >
                    {/* Glyph 1: Y */}
                    <g fill="currentColor">
                      <rect x="12" y="12" width="28" height="42" rx="14" />
                      <circle cx="26" cy="26" r="6" fill="#af50ff" />
                      <rect x="76" y="12" width="28" height="42" rx="14" />
                      <circle cx="90" cy="26" r="6" fill="#af50ff" />
                      <path d="M26 40 L58 72 H58 L90 40 L76 30 L58 52 L40 30 Z" />
                      <rect x="44" y="60" width="28" height="48" rx="14" />
                      <circle cx="58" cy="94" r="6" fill="#af50ff" />
                      <rect x="8" y="52" width="6" height="12" rx="3" fill="#af50ff" />
                      <rect x="102" y="52" width="6" height="12" rx="3" fill="#af50ff" />
                    </g>

                    {/* Glyph 2: R */}
                    <g fill="currentColor">
                      <rect x="144" y="12" width="28" height="96" rx="14" />
                      <circle cx="158" cy="26" r="6" fill="#af50ff" />
                      <circle cx="158" cy="94" r="6" fill="#af50ff" />
                      <path
                        d="M166 12 H208 C226 12 240 26 240 44 C240 62 226 74 208 74 H166 Z"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      />
                      <circle cx="202" cy="43" r="14" fill="#af50ff" />
                      <path d="M188 68 L232 108 H200 L166 74 Z" />
                      <circle cx="228" cy="98" r="14" />
                      <circle cx="228" cy="98" r="5" fill="#af50ff" />
                    </g>
                  </svg>
                  <span className="text-[11px] font-mono tracking-[0.2em] text-[#090909]/70 uppercase">
                    YASH RYAN RELIANT
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Stacked ruled navigation menu + Social links */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <nav aria-label="Footer navigation">
                {/* Expandable Specializations row */}
                <div className="border-t border-[#090909]/20">
                  <button
                    type="button"
                    onClick={() => setSpecializationsExpanded(!specializationsExpanded)}
                    className="w-full py-3.5 sm:py-4 flex items-center justify-between text-left group transition-transform duration-200"
                    aria-expanded={specializationsExpanded}
                  >
                    <span className="text-xl sm:text-2xl lg:text-[28px] font-normal tracking-tight text-[#090909] font-whyte group-hover:opacity-75 transition-opacity">
                      Specializations
                    </span>
                    <span className="text-base sm:text-lg text-[#090909]/70 group-hover:text-[#090909] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                      {specializationsExpanded ? '⌄' : '↗'}
                    </span>
                  </button>

                  {/* Accordion content for specializations */}
                  {specializationsExpanded && (
                    <div className="pb-4 pt-1 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#090909]/85 font-whyte animate-in fade-in slide-in-from-top-2 duration-200">
                      {specializations.map((spec) => (
                        <Link
                          key={spec}
                          href="/skills"
                          className="px-2.5 py-1.5 rounded-md hover:bg-[#090909]/10 transition-colors flex items-center gap-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#090909]" />
                          <span>{spec}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Main page links */}
                {navigationLinks.map((item) => (
                  <div key={item.name} className="border-t border-[#090909]/20">
                    <Link
                      href={item.href}
                      className="w-full py-3.5 sm:py-4 flex items-center justify-between group transition-transform duration-200 hover:translate-x-1"
                    >
                      <span className="text-xl sm:text-2xl lg:text-[28px] font-normal tracking-tight text-[#090909] font-whyte group-hover:opacity-75 transition-opacity">
                        {item.name}
                      </span>
                      <span className="text-base sm:text-lg opacity-0 -translate-x-2 text-[#090909]/60 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                        →
                      </span>
                    </Link>
                  </div>
                ))}
                {/* Final bottom divider for the list */}
                <div className="border-t border-[#090909]/20" />
              </nav>

              {/* Social Icons row beneath the navigation list */}
              <div className="mt-8 sm:mt-10 flex items-center gap-5" aria-label="Social links">
                {socialLinks.map(({ platform, href, label }) => (
                  <a
                    key={platform}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-[#090909] p-1.5 -m-1.5 rounded-md transition-all duration-200 hover:scale-115 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#090909]"
                  >
                    <SocialIcon platform={platform} className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright, Admin Login & Postcard Coordinates */}
          <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-[#090909]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm text-[#090909]/75 font-whyte">
            <p>© {currentYear} All rights reserved, Yash Ryan Reliant.</p>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <Link
                href="/admin/login"
                className="font-medium text-[#090909] hover:underline underline-offset-4 transition-colors"
              >
                Admin Login
              </Link>
              <span className="text-[#090909]/40" aria-hidden="true">•</span>
              <span className="font-mono tracking-wider text-[#090909]/80">
                09.9312° N &nbsp; 76.2673° E
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
