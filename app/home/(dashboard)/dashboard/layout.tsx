import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';

import { dashboardConfig } from '@/config/dashboard';
import { DashboardNav } from '@/components/layout/nav';
import { NavBar } from '@/components/layout/navbar';
import { SiteFooter } from '@/components/layout/site-footer';
import { getUserSubscriptionPlan } from '@/lib/subscription';
import { prisma } from '@/lib/db';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await currentUser();

  if (!user) {
    redirect('/signin');
  }

  const userDb = await prisma.user.findFirst({
    where: { id: user.id },
    include: {
      adminUser: true,
    },
  });

  const isAdmin = userDb?.adminUser ? true : false;

  const userSubscriptionPlan = await getUserSubscriptionPlan(user.id);

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <NavBar
        items={dashboardConfig.mainNav}
        scroll={false}
        stripe={userSubscriptionPlan}
        isAdmin={isAdmin}
      />
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  );
}
