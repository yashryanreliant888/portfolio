import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  webpack: (config) => {
    // Allow pdfjs-dist to resolve its worker via import.meta.url
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default nextConfig;
