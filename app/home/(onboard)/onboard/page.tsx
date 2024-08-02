import { Metadata } from 'next';
import { fetchLinkedInProfile } from '@/actions/fetch-linkedin';
import { currentUser } from '@clerk/nextjs/server';
import OnboardCard from '@/components/onboard/onboard-card';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';

export const maxDuration = 30;

export const metadata: Metadata = {
  title: 'Onboard',
  description: 'Onboarding of Linkify',
};

export default async function OnboardPage({
  searchParams,
}: {
  searchParams: {
    email: string;
  };
}) {
  const { email } = searchParams;
  const user = await currentUser();

  if (user) {
    redirect('/dashboard/');
  }

  if (!email) {
    redirect('/onboard/error?email=undefined');
  }

  if (typeof email !== 'string') {
    redirect('/onboard/error?email=undefined');
  }

  const existingUser = await prisma.user.findFirst({
    where: { email: email },
  });

  if (existingUser) {
    redirect('/onboard/error?email=' + email + '&err=exists');
  }

  const emailStr = email;
  const formdata = { email: emailStr };

  const response = await fetchLinkedInProfile(formdata);

  const { status, message, data } = response;

  if (status === 'error' || !data) {
    return redirect('/onboard/error?email=' + emailStr + '&err=' + message);
  }

  const processedData = {
    ...data,
    // recommendations: [],
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-12 px-4 text-center">
      <div className="w-full max-w-md">
        <OnboardCard email={emailStr} profile={processedData} />
      </div>
    </div>
  );
}
