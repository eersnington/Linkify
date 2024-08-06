import { MainNavItem, SidebarNavItem, SiteConfig } from 'types';
import { env } from '@/env.mjs';

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: 'Resumade',
  author: 'Sreenington',
  description:
    'Transform your LinkedIn profile into a stunning personal website effortlessly with Resumade. Showcase your professional experience, skills, and projects in a few clicks.',
  url: site_url,
  ogImage: `${site_url}/og.jpg`,
  links: {
    twitter: 'https://twitter.com/ridwan_mahmood/',
    github: '-',
  },
  twitterID: '@ridwan_mahmood',
  mailSupport: 'support@resumade.com',
  seoKeywords: [
    'Resumade',
    'LinkedIn profile to website',
    'personal website builder',
    'CV website builder',
    'professional website creation',
    'LinkedIn website transformation',
    'easy CV to website',
    'Resumade professional site',
    'create a website from LinkedIn',
    'Resumade website builder',
    'personal branding website',
    'LinkedIn profile website maker',
    'quick CV website',
    'Resumade site generator',
  ],
  defaultTheme: 'light', // "dark" | "light" | "system"
};

export const footerLinks: SidebarNavItem[] = [
  {
    title: 'Resumade',
    items: [
      { title: 'About', href: '#' },
      { title: 'Pricing', href: '/pricing' },
      { title: 'Blog', href: '/blog' },
      { title: 'Enterprise', href: '#' },
      { title: 'Partners', href: '#' },
      { title: 'Jobs', href: '#' },
    ],
  },
  {
    title: 'Socials',
    items: [
      { title: 'X | Twitter', href: 'https://twitter.com/sreenington/' },
      { title: 'LinkedIn', href: 'https://www.linkedin.com/in/sreenington/' },
      {
        title: 'Product Hunt',
        href: 'https://www.producthunt.com/@sreenington',
      },
    ],
  },
  {
    title: 'Legal',
    items: [
      { title: 'Terms of Service', href: '/terms' },
      { title: 'Privacy Policy', href: '/privacy' },
    ],
  },
];
