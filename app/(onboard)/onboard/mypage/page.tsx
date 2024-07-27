// pages/onboard/mypage.tsx

export const maxDuration = 30;

import { redirect } from 'next/navigation';
import { getStoredProfile } from '@/actions/fetch-linkedin copy';
import { LinkedInProfileProvider } from '@/context/linkedin-profile-context';

import PageEditor from '@/components/mypage/page-editor';
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
