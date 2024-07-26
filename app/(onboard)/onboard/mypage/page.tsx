// pages/onboard/mypage.tsx

export const maxDuration = 30;

import { redirect } from 'next/navigation';
import { getStoredProfile } from '@/actions/fetch-linkedin copy';
import { LinkedInProfileProvider } from '@/context/linkedin-profile-context';

import PageEditor from '@/components/page-editor';

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
    <div className="flex h-full flex-1 bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-700 p-4">
      <PageEditor email={email} />
    </div>
  );
}
