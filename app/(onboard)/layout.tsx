import { Suspense } from 'react';
import Link from 'next/link';
import Logo from '@/components/shared/logo';
import { LinkedInDataProvider } from '@/context/linkedin-data-context';

interface LayoutProps {
  children: React.ReactNode;
}

export default function OnboardLayout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* <header className="lg:flex items-center justify-between p-4 hidden">
        <Link
          href="/"
          className="flex items-center text-lg font-bold text-purple-950"
        >
          <Logo className="mr-2 rounded-lg" />
          Linkify
        </Link>
      </header> */}
      <Suspense fallback="...">
        <main className="flex-1 flex flex-col items-center justify-center text-purple-950">
          <LinkedInDataProvider>{children}</LinkedInDataProvider>
        </main>
      </Suspense>
    </div>
  );
}
