import { redirect } from 'next/navigation';
import { ThemeTemplateProvider } from '@/context/editor-sidebar-context';
import { currentUser } from '@clerk/nextjs/server';

import { dashboardConfig } from '@/config/dashboard';
import { NavBar } from '@/components/layout/navbar';
import { getUserSubscriptionPlan } from '@/lib/subscription';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function PageLayout({ children }: DashboardLayoutProps) {
  const user = await currentUser();

  if (!user) {
    redirect('/signin');
  }

  const userSubscriptionPlan = await getUserSubscriptionPlan(user.id);

  return (
    <div className="flex h-screen flex-col">
      <NavBar
        items={dashboardConfig.mainNav}
        scroll={false}
        stripe={userSubscriptionPlan}
      />
      <div className="flex-1 overflow-hidden">
        <ThemeTemplateProvider>{children}</ThemeTemplateProvider>
      </div>
    </div>
  );
}
