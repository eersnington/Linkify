import { Suspense } from 'react';
import { SiteFooter } from '@/components/layout/site-footer';
import { LandingNavBar } from '@/components/layout/landing-nav';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback="...">
        <LandingNavBar scroll={true} />
      </Suspense>
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
