import { redirect } from 'next/navigation';
import { ThemeTemplateProvider } from '@/context/editor-sidebar-context';
import { currentUser } from '@clerk/nextjs/server';

import { dashboardConfig } from '@/config/dashboard';
import { NavBar } from '@/components/layout/navbar';
import { getUserSubscriptionPlan } from '@/lib/subscription';
import { prisma } from '@/lib/db';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function PageLayout({ children }: DashboardLayoutProps) {
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
    <div className="flex h-screen flex-col">
      <NavBar
        items={dashboardConfig.mainNav}
        scroll={false}
        stripe={userSubscriptionPlan}
        isAdmin={isAdmin}
      />
      <div className="flex-1 overflow-hidden">
        <ThemeTemplateProvider>{children}</ThemeTemplateProvider>
      </div>
    </div>
  );
}
