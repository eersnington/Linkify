import { notFound } from 'next/navigation';
import { headers } from 'next/headers';

import UserPageContent from './_component/user-page-content';
import { prisma } from '@/lib/db';
import { ThemeTemplateProvider } from '@/context/editor-sidebar-context';
import AnalyticsTracker from '@/components/analytics';
import NotFoundScreen from '@/components/notfound';

const getDomainInfo = (host: string, rootDomain: string) => {
  // Check if it's a localhost domain
  if (host.includes('localhost')) {
    const parts = host.split('.');
    if (parts.length > 1) {
      return { type: 'localhost', subdomain: parts[0] };
    }
  }

  // Check for subdomain on root domain
  if (host.endsWith(rootDomain)) {
    const parts = host.split('.');
    if (parts.length > 2) {
      return { type: 'subdomain', subdomain: parts[0] };
    }
  }

  // If it's neither localhost nor a subdomain, it might be a custom domain
  return { type: 'custom', domain: host };
};

export async function generateMetadata() {
  const headersList = headers();
  const hostname = headersList.get('host') || '';
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || '';

  const domainInfo = getDomainInfo(hostname, rootDomain);

  console.log('Domain Info:', domainInfo);

  let website;

  if (domainInfo.type === 'localhost' || domainInfo.type === 'subdomain') {
    website = await prisma.website.findUnique({
      where: { domainName: domainInfo.subdomain },
    });
  } else if (domainInfo.type === 'custom') {
    // Check for premium user with custom domain
    website = await prisma.website.findFirst({
      where: {
        user: {
          domain: domainInfo.domain,
          stripeCustomerId: { not: null },
        },
      },
      include: { user: true },
    });
  }

  if (!website) {
    return {
      title: 'Page Not Found',
    };
  }

  if (website.firstName?.length == 0 || website.firstName == null) {
    return {
      title: `${website.domainName}'s Page`,
      description: `Welcome to ${website.domainName}'s personal page`,
    };
  }

  return {
    title: `${website.firstName}'s Page`,
    description: `Welcome to ${website.firstName}'s personal page`,
  };
}

export default async function UserPage() {
  const headersList = headers();
  const hostname = headersList.get('host') || '';
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || '';

  const domainInfo = getDomainInfo(hostname, rootDomain);

  console.log('Domain Info:', domainInfo);

  let website;

  if (domainInfo.type === 'localhost' || domainInfo.type === 'subdomain') {
    website = await prisma.website.findUnique({
      where: { domainName: domainInfo.subdomain },
    });
  } else if (domainInfo.type === 'custom') {
    // Check for premium user with custom domain
    website = await prisma.website.findFirst({
      where: {
        user: {
          domain: domainInfo.domain,
          stripeCustomerId: { not: null },
        },
      },
      include: { user: true },
    });
  }

  if (!website) {
    console.log('Website not found');
    return <NotFoundScreen />;
  }

  console.log('Website found');

  const linkedinProfile = await prisma.linkedInProfile.findUnique({
    where: { userEmail: website.userEmail },
  });

  if (!linkedinProfile) {
    console.log('LinkedIn profile not found');
    return <NotFoundScreen />;
  }

  return (
    <ThemeTemplateProvider>
      <AnalyticsTracker />
      <UserPageContent
        profile={linkedinProfile}
        templateId={website.template}
      />
    </ThemeTemplateProvider>
  );
}
