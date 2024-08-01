import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';
import { ThemeTemplateProvider } from '@/context/editor-sidebar-context';
import NotFoundScreen from '@/components/notfound';
import UserPageContent from '@/app/[userDomain]/_component/user-page-content';
import AnalyticsTracker from '@/components/analytics';

const ALLOWED_EMAIL = 'sree.zaplineai@gmail.com';

export async function generateMetadata() {
  const user = await currentUser();

  if (!user || user.emailAddresses[0].emailAddress !== ALLOWED_EMAIL) {
    return {
      title: 'Page Not Found',
    };
  }

  const website = await prisma.website.findUnique({
    where: { userEmail: ALLOWED_EMAIL },
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
  const user = await currentUser();

  console.log('User:', user);

  if (!user || user.emailAddresses[0].emailAddress !== ALLOWED_EMAIL) {
    return <NotFoundScreen />;
  }

  const website = await prisma.website.findUnique({
    where: { userEmail: ALLOWED_EMAIL },
  });

  if (!website) {
    console.log('Website not found');
    return <NotFoundScreen />;
  }

  console.log('Website found');

  const linkedinProfile = await prisma.linkedInProfile.findUnique({
    where: { userEmail: ALLOWED_EMAIL },
  });

  if (!linkedinProfile) {
    console.log('LinkedIn profile not found');
    return <NotFoundScreen />;
  }

  return (
    <ThemeTemplateProvider>
      <AnalyticsTracker subdomain={website.domainName} />
      <UserPageContent
        profile={linkedinProfile}
        templateId={website.template}
      />
    </ThemeTemplateProvider>
  );
}
