'use client';

import Link from 'next/link';
import { MainNavItem } from '@/types';
import { useUser } from '@clerk/nextjs';

import { cn } from '@/lib/utils';
import useScroll from '@/hooks/use-scroll';
import { Button, buttonVariants } from '@/components/ui/button';

import { MainNav } from './main-nav';
import { UserAccountNav } from './user-account-nav';

interface NavBarProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
  rightElements?: React.ReactNode;
  scroll?: boolean;
}

export function LandingNavBar({
  items,
  children,
  rightElements,
  scroll = false,
}: NavBarProps) {
  const scrolled = useScroll(50);
  const { isLoaded, isSignedIn, user } = useUser();

  const userObj = {
    name: user?.fullName || '',
    email: user?.emailAddresses[0]?.emailAddress || '',
  };

  return (
    <header
      className={`sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all ${
        scroll ? (scrolled ? 'border-b' : 'bg-background/0') : 'border-b'
      }`}
    >
      <div className="container flex h-[60px] items-center justify-between py-4">
        <MainNav items={items}>{children}</MainNav>

        <div className="flex items-center space-x-3 ">
          {rightElements}

          {isSignedIn ? (
            <UserAccountNav user={userObj} />
          ) : (
            <Link
              href="/signin"
              className="flex gap-2 bg-transparent text-purple-950 px-4 text-sm font-semibold hover:bg-transparent hover:text-purple-600"
            >
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
