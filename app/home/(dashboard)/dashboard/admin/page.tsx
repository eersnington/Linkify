// app/admin/page.tsx
import { prisma } from '@/lib/db';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardShell } from '@/components/dashboard/shell';
import { AdminDashboardContent } from '@/components/admin-dashboard';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const super_admin = 'sreeaadhi07@gmail.com';

export default async function AdminDashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/signin');
  }

  const userEmail = user.emailAddresses[0].emailAddress;

  const users = await prisma.user.findMany({
    include: {
      website: true,
    },
  });

  const adminUsers = await prisma.adminUser.findMany();

  if (userEmail !== super_admin) {
    if (!adminUsers.find((adminUser) => adminUser.userEmail === userEmail)) {
      redirect('/dashboard');
    }
  }

  const sources = await prisma.source.findMany();

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Admin Dashboard"
        text="View all users and their details."
      />
      <AdminDashboardContent
        users={users}
        adminUsers={adminUsers}
        sources={sources}
      />
    </DashboardShell>
  );
}
