import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const paths = ['', '/about', '/skills', '/experience', '/education', '/certifications', '/projects', '/gallery', '/contact'];
  return paths.map((path) => ({ url: `${baseUrl}${path}`, changeFrequency: path === '/projects' ? 'weekly' : 'monthly', priority: path === '' ? 1 : 0.7 }));
}
