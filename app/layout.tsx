import type { Metadata } from 'next';
import './globals.css';
import { SmoothScroll } from '@/components';

export const metadata: Metadata = {
  title: 'Yash Ryan Reliant | Digital Marketing Specialist',
  description: 'Professional digital marketing portfolio showcasing expertise in SEO, paid advertising, social media marketing, analytics, and AI-integrated marketing.',
  keywords: ['digital marketing', 'SEO', 'paid advertising', 'social media marketing', 'marketing analytics', 'Kerala', 'India'],
  authors: [{ name: 'Yash Ryan Reliant' }],
  creator: 'Yash Ryan Reliant',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Yash Ryan Reliant | Digital Marketing Specialist',
    description: 'Professional digital marketing portfolio showcasing expertise in SEO, paid advertising, social media marketing, and analytics.',
    siteName: 'Yash Ryan Reliant Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yash Ryan Reliant | Digital Marketing Specialist',
    description: 'Digital marketing professional specializing in SEO, paid advertising, and analytics.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen"><SmoothScroll />{children}</body>
    </html>
  );
}
