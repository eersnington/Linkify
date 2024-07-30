import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardShell } from '@/components/dashboard/shell';
import { PageViewsChart } from '@/components/charts/page-view-chart';
import { prisma } from '@/lib/db';
import Link from 'next/link';

export const metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/login');
  }

  const website = await prisma.website.findFirst({
    where: { userEmail: user?.emailAddresses[0].emailAddress },
  });

  if (!website) {
    return (
      <DashboardShell>
        <DashboardHeader
          heading="Dashboard"
          text="View your Web Analytics here"
        />
        <div className="grid gap-4">
          <p className="text-lg text-center">
            You do not have any website.{' '}
            <Link href="/mypage" className="link">
              Create a website
            </Link>
          </p>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="View your Web Analytics here"
      />{' '}
      <div className="grid gap-4">
        <PageViewsChart path={website?.domainName} />
      </div>
    </DashboardShell>
  );
}
