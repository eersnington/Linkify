import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardShell } from '@/components/dashboard/shell';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { HeadphonesIcon } from 'lucide-react';

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
      stripeCustomerId: true,
    },
  });

  if (!userDb) {
    redirect('/login');
  }

  const isPremium = userDb.stripeCustomerId !== null;
  const supportText = isPremium
    ? 'Priority Support'
    : 'Get help with your account.';

  return (
    <DashboardShell>
      <DashboardHeader heading="Support" text={supportText} />
      <div className="mt-4 space-y-6">
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-semibold">
            Welcome, {userDb.firstName} {userDb.lastName}
          </h2>
        </div>
        <div className="bg-white p-6 shadow rounded-lg">
          <h3 className="text-lg font-medium">Account Details</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <strong>First Name:</strong> {userDb.firstName}
            </li>
            <li>
              <strong>Last Name:</strong> {userDb.lastName}
            </li>
            <li>
              <strong>Subscription Status:</strong>{' '}
              {isPremium ? 'Premium' : 'Free'}
            </li>
          </ul>
        </div>
        <div className="bg-white p-6 shadow rounded-lg">
          <h3 className="text-lg font-medium">Support Options</h3>
          <div className="mt-2 space-y-4">
            <Button
              variant={'outline'}
              className="px-4 py-2 text-white hover:text-white bg-blue-500 rounded-xl hover:bg-blue-700"
            >
              <Link
                href={`mailto:${siteConfig.mailSupport}`}
                className="inline-flex items-center"
              >
                <HeadphonesIcon className="mr-2" />
                Contact {isPremium ? 'Priority ' : ''}Support
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
