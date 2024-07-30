// pages/onboard/mypage.tsx

export const maxDuration = 30;

import { redirect } from 'next/navigation';

import OnboardEditor from '@/components/onboard/onboard-editor';

export const metadata = {
  title: 'Onboarding | My Page',
  description: 'Customize your webpage here',
};

export default async function MyPage({
  searchParams,
}: {
  searchParams: { email: string };
}) {
  const { email } = searchParams;

  if (!email) {
    redirect('/');
  }

  return (
    <div className="flex h-full w-full bg-purple-950">
      <OnboardEditor email={email} />
    </div>
  );
}
