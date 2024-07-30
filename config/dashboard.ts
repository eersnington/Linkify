import { DashboardConfig } from 'types';

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'My Page',
      href: '/mypage',
    },
    {
      title: 'Dashboard',
      href: '/dashboard/',
    },
    {
      title: 'Support',
      href: '/dashboard/support',
    },
  ],
  sidebarNav: [
    {
      title: 'Domains',
      href: '/dashboard/domains',
      icon: 'link',
    },

    {
      title: 'Billing',
      href: '/dashboard/billing',
      icon: 'billing',
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: 'settings',
    },
  ],
};
