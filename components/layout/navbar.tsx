'use client';

import Link from 'next/link';
import { MainNavItem } from '@/types';
import { useUser } from '@clerk/nextjs';

import useScroll from '@/hooks/use-scroll';
import { Button, buttonVariants } from '@/components/ui/button';
import { MainNav } from './main-nav';
import { UserAccountNav } from './user-account-nav';
import { UpgradeButton } from '../upgrade-button';
import { Sparkles } from 'lucide-react';

interface NavBarProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
  rightElements?: React.ReactNode;
  scroll?: boolean;
  stripe?: any;
  isAdmin?: boolean;
}

export function NavBar({
  items,
  children,
  rightElements,
  scroll = false,
  stripe,
  isAdmin,
}: NavBarProps) {
  const scrolled = useScroll(50);
  const { isLoaded, isSignedIn, user } = useUser();

  const userObj = {
    name: user?.fullName || '',
    email: user?.emailAddresses[0]?.emailAddress || '',
    isAdmin,
  };

  const { isPaid } = stripe;

  return (
    <header
      className={`sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all ${
        scroll ? (scrolled ? 'border-b' : 'bg-background/0') : 'border-b'
      }`}
    >
      <div className="container flex h-[60px] items-center justify-between py-4">
        <MainNav items={items} isDashboard>
          {children}
        </MainNav>

        <div className="flex items-center space-x-3 ">
          {rightElements}

          {isSignedIn ? (
            <>
              {!isPaid ? (
                <UpgradeButton />
              ) : (
                <Button className={'bg-gradient_indigo-purple'}>
                  <Link href="/dashboard/billing">
                    <span className="flex items-center space-x-2">
                      <Sparkles className="text-yellow-500 h-4 w-4 mr-2" />
                      Premium Member
                    </span>
                  </Link>
                </Button>
              )}
              <UserAccountNav user={userObj} />
            </>
          ) : (
            <Link
              href="/signin"
              className="flex gap-2 bg-transparent px-4 text-sm font-semibold hover:bg-transparent hover:text-purple-600"
            >
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
