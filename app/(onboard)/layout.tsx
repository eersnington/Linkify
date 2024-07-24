import { Suspense } from "react";
import Link from "next/link";

import Logo from "@/components/shared/logo";

interface LayoutProps {
  children: React.ReactNode;
}

export default function OnboardLayout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-700">
      <Suspense fallback="...">
        <header className="flex items-center p-4">
          <Link
            href="/"
            className="flex items-center text-lg font-bold text-white"
          >
            <Logo className="mr-2 text-white" />
            Linkify
          </Link>
        </header>
      </Suspense>
      <main className="flex-1">{children}</main>
    </div>
  );
}
