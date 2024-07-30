// app/[userDomain]/page.tsx

import { notFound } from 'next/navigation';

import UserPageContent from './_component/user-page-content';
import { prisma } from '@/lib/db';
import { ThemeTemplateProvider } from '@/context/editor-sidebar-context';
import AnalyticsTracker from '@/components/analytics';
import NotFoundScreen from '@/components/notfound';

export async function generateMetadata({
  params,
}: {
  params: { userDomain: string };
}) {
  const website = await prisma.website.findUnique({
    where: { domainName: params.userDomain },
  });

  console.log(website);

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

export default async function UserPage({
  params,
}: {
  params: { userDomain: string };
}) {
  const website = await prisma.website.findUnique({
    where: { domainName: params.userDomain },
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
