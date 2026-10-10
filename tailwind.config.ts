import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'near-black': 'var(--color-near-black)',
        'almost-white': 'var(--color-almost-white)',
        'soft-white': 'var(--color-soft-white)',
        'steel': 'var(--color-steel)',
        'graphite': 'var(--color-graphite)',
        'iron': 'var(--color-iron)',
        'ash': 'var(--color-ash)',
        'signal-violet': 'var(--color-signal-violet)',
        'lavender-mist': 'var(--color-lavender-mist)',
      },
      fontFamily: {
        'whyte': 'var(--font-whyte-inktrap)',
        'whyte-mono': 'var(--font-whyte-inktrap-mono)',
        'grandslang': 'var(--font-grandslang)',
        'system-ui': 'var(--font-system-ui)',
        'karla': 'var(--font-karla)',
      },
      borderRadius: {
        'lg': 'var(--radius-lg)',
        'lg-2': 'var(--radius-lg-2)',
        '2xl': 'var(--radius-2xl)',
        'full': 'var(--radius-full)',
        'full-2': 'var(--radius-full-2)',
        'full-3': 'var(--radius-full-3)',
        'cards': 'var(--radius-cards)',
        'pills': 'var(--radius-pills)',
        'buttons': 'var(--radius-buttons)',
      },
      maxWidth: {
        'page': 'var(--page-max-width)',
      },
      spacing: {
        'section': 'var(--section-gap)',
        'card': 'var(--card-padding)',
      },
    },
  },
  plugins: [],
};

export default config;
