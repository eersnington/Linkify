import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardShell } from '@/components/dashboard/shell';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import DomainAvailability from '@/components/domains';

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
      <DashboardHeader
        heading="Domains"
        text="Purchase and connect your domain"
      />
      <div className="grid gap-10">
        <DomainAvailability />
      </div>
    </DashboardShell>
  );
}
