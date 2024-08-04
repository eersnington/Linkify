// pages/dashboard/page.tsx

import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';

import PageEditor from '@/components/mypage/page-editor';
import { LinkedInDataProvider } from '@/context/linkedin-data-context';
import { getUserSubscriptionPlan } from '@/lib/subscription';
import { prisma } from '@/lib/db';
import { ChangesMadeProvider } from '@/context/changes-made-context';

export const metadata = {
  title: 'My Page',
  description: 'Customize your webpage here',
};

export default async function MyPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/login');
  }

  const userSubscriptionPlan = await getUserSubscriptionPlan(user.id);

  const linkedInProfile = await prisma.linkedInProfile.findFirst({
    where: {
      userEmail: user.emailAddresses[0].emailAddress,
    },
  });

  return (
    <LinkedInDataProvider>
      <ChangesMadeProvider>
        <div className="flex h-full flex-1 bg-purple-950 p-4">
          <PageEditor
            isUserPremium={userSubscriptionPlan.isPaid}
            profileData={linkedInProfile}
          />
        </div>
      </ChangesMadeProvider>
    </LinkedInDataProvider>
  );
}
