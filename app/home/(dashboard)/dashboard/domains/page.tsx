import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardShell } from '@/components/dashboard/shell';
import {
  DomainSearchAndPurchase,
  DomainConfigStatus,
} from '@/components/domains';

export const metadata = {
  title: 'Domains',
  description: 'Purchase and connect your domain',
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
  });

  if (!userDb) {
    redirect('/login');
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Domains"
        text={
          userDb.domain
            ? 'Manage your domain'
            : 'Purchase and connect your domain'
        }
      />
      <div className="grid gap-10 p-8">
        {userDb.domain ? (
          <DomainConfigStatus domain={userDb.domain} />
        ) : (
          <DomainSearchAndPurchase />
        )}
      </div>
    </DashboardShell>
  );
}
