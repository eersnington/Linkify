const { withContentlayer } = require('next-contentlayer2');

import('./env.mjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.co',
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
      },
      {
        protocol: 'https',
        hostname: 'linkifyme.pro',
      },
      {
        protocol: 'https',
        hostname: 'resumade.com',
      },
      {
        protocol: 'https',
        hostname: process.env.SUPABASE_HOST,
      },
      {
        protocol: 'https',
        hostname: 'tqbquifstcxowvavjpis.supabase.co',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: [
      '@prisma/client',
      'pdf2json',
      '@clerk/elements',
    ],
  },
};

module.exports = withContentlayer(nextConfig);
