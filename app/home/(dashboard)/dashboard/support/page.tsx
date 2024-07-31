import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardShell } from '@/components/dashboard/shell';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

export const metadata = {
  title: 'Support',
  description: 'Get help with your account.',
};

export default async function SettingsPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/login');
  }

  const userDb = await prisma.user.findFirst({
    where: {
      id: user.id,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });

  if (!userDb) {
    redirect('/login');
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Support" text="Get help with your account." />
      <div className="mt-4">
        <Button
          variant={'outline'}
          className="inline-block px-4 py-2 text-white hover:text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          <Link href={`mailto:${siteConfig.mailSupport}`}>Contact Support</Link>
        </Button>
      </div>
    </DashboardShell>
  );
}
