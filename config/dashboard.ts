import { DashboardConfig } from 'types';

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'My Page',
      href: '/mypage',
    },
    {
      title: 'Analytics',
      href: '/dashboard/',
    },
    {
      title: 'Domains',
      href: '/dashboard/domains',
    },
    {
      title: 'Support',
      href: '/dashboard/support',
    },
  ],
  sidebarNav: [
    {
      title: 'My Page',
      href: '/mypage',
      icon: 'user',
    },
    {
      title: 'Analytics',
      href: '/dashboard/',
      icon: 'barchart',
    },
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
