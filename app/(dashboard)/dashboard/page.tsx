import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardShell } from '@/components/dashboard/shell';
import { PageViewsChart } from '@/components/charts/page-view-chart';
import { TopCountriesChart } from '@/components/charts/top-countries-chart';
import { TopPagesChart } from '@/components/charts/top-page-chart';

export const metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="View your Web Analytics here"
      />{' '}
      <div className="grid gap-4">
        <PageViewsChart />
        <div className="grid gap-4 md:grid-cols-2">
          <TopPagesChart />
          <TopCountriesChart />
        </div>
      </div>
    </DashboardShell>
  );
}
