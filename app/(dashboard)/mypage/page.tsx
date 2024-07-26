// pages/dashboard/page.tsx

import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';

import { Button } from '@/components/ui/button';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardShell } from '@/components/dashboard/shell';
import { PageSidebar } from '@/components/layout/page-sidebar';
import PageCanvas from '@/components/page-canvas';
import PageEditor from '@/components/page-editor';
import { LinkedInDataProvider } from '@/context/linkedin-data-context';

export const metadata = {
  title: 'My Page',
  description: 'Customize your webpage here',
};

export default async function MyPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/login');
  }

  const email = user.emailAddresses[0].emailAddress;

  return (
    <LinkedInDataProvider>
      <div className="flex h-full flex-1 bg-purple-950 p-4">
        <PageEditor email={email} />
      </div>
    </LinkedInDataProvider>
  );
}
