// [userDomain] is a dynamic route that will be used to render the user's page

import { notFound } from 'next/navigation';
import { headers } from 'next/headers';

import UserPageContent from './_component/user-page-content';
import { prisma } from '@/lib/db';
import { ThemeTemplateProvider } from '@/context/editor-sidebar-context';
import AnalyticsTracker from '@/components/analytics';
import NotFoundScreen from '@/components/notfound';

const getSubdomain = (host: string, rootDomain: string) => {
  // Check if it's a localhost domain
  if (host.includes('localhost')) {
    const parts = host.split('.');
    if (parts.length > 1) {
      return parts[0];
    }
    return null;
  }

  // Check for public domain
  if (host.endsWith(rootDomain)) {
    const parts = host.split('.');
    // Check if there's a subdomain
    if (parts.length > 2) {
      return parts[0];
    }
  }

  return null;
};

export async function generateMetadata() {
  const headersList = headers();
  const hostname = headersList.get('host') || '';
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

  const subdomain = getSubdomain(hostname, rootDomain || '');

  console.log('Hostname:', hostname);
  console.log('Subdomain:', subdomain);

  if (!subdomain) {
    return {
      title: 'Page Not Found',
    };
  }

  const website = await prisma.website.findUnique({
    where: { domainName: subdomain },
  });

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
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

  const subdomain = getSubdomain(hostname, rootDomain || '');

  if (!subdomain) {
    console.log('Subdomain not found');
    return <NotFoundScreen />;
  }

  const website = await prisma.website.findUnique({
    where: { domainName: subdomain },
  });

  if (!website) {
    console.log('Website not found');
    return <NotFoundScreen />;
  }

  console.log('website found');

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
