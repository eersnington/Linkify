import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardShell } from '@/components/dashboard/shell';
import DashboardCards from '@/components/dashboard/dashboard-card';
import { Loader } from 'lucide-react';

export const metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage() {
  const user = await currentUser();

  const website = await prisma.website.findFirst({
    where: { userEmail: user?.emailAddresses[0].emailAddress },
  });

  const userDb = await prisma.user.findFirst({
    where: { id: user?.id },
  });

  const domainName = website?.domainName;

  return (
    <DashboardShell className="">
      <DashboardHeader heading="Dashboard" text="View Your Web Analytics" />
      <DashboardCards
        website={website}
        userDb={userDb}
        domainName={domainName}
      />
    </DashboardShell>
  );
}
