import { CardSkeleton } from '@/components/shared/card-skeleton';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardShell } from '@/components/dashboard/shell';

export default function DashboardCheckoutLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Checkout"
        text="Checkout and complete your purchase."
      />
      <div className="grid gap-10">Loading checkout...</div>
    </DashboardShell>
  );
}
