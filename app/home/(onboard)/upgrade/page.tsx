import OnboardUpgrade from '@/components/onboard/onboard-upgrade';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function Page({
  searchParams,
}: {
  searchParams: { email: string };
}) {
  const { email } = searchParams;

  const existingUser = await prisma.user.findFirst({
    where: { email: email },
  });

  if (existingUser) {
    redirect('/onboard/error?email=' + email + '&err=exists');
  }

  return (
    <>
      <OnboardUpgrade emailAddress={email} />
    </>
  );
}
