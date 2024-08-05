// app/admin/page.tsx
import { prisma } from '@/lib/db';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardShell } from '@/components/dashboard/shell';
import { AdminDashboardContent } from '@/components/admin-dashboard';

export default async function AdminDashboardPage() {
  const users = await prisma.user.findMany({
    include: {
      website: true,
    },
  });

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Admin Dashboard"
        text="View all users and their details."
      />
      <AdminDashboardContent users={users} />
    </DashboardShell>
  );
}
