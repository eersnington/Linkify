import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { CardSkeleton } from "@/components/shared/card-skeleton";

export default function DashboardBillingLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Page" text=" Customize your webpage here">
        <Button>Publish</Button>
      </DashboardHeader>
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  );
}
