'use client';

import Link from 'next/link';
import { useState } from 'react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Skills', href: '/skills' },
  { name: 'Experience', href: '/experience' },
  { name: 'Certifications', href: '/certifications' },
  { name: 'Education', href: '/education' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="nav-bar">
      <nav className="max-w-page mx-auto px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="terminal-brand" aria-label="Yash Ryan Reliant home">
          <span className="terminal-brand__mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none" role="presentation">
              <path d="M7 7v18M7 7l9 9m0 0 9-9m-9 9v9" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
              <path d="M21 16h4" stroke="var(--color-signal-violet)" strokeWidth="2" strokeLinecap="square" />
              <circle cx="25" cy="16" r="1.6" fill="var(--color-signal-violet)" />
            </svg>
          </span>
          <span className="terminal-brand__name">YASH<span>RYAN</span></span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-7">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="nav-label text-ash hover:text-almost-white transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
          <Link href="/contact" className="terminal-nav-cta">LET'S TALK ↗</Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden text-almost-white au-enter au-wipe"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-ash/20">
          <div className="px-8 py-6 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-sm text-ash hover:text-almost-white transition-colors duration-200 uppercase tracking-wide"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
