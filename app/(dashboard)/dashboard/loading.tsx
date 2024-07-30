import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardShell } from '@/components/dashboard/shell';
import { CardSkeleton } from '@/components/shared/card-skeleton';

export default function DashboardBillingLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="View Your Web Analytics" />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  );
}
