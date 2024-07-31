'use client';

import Link from 'next/link';
import { MainNavItem } from '@/types';
import { useUser } from '@clerk/nextjs';

import { cn } from '@/lib/utils';
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
}

export function NavBar({
  items,
  children,
  rightElements,
  scroll = false,
  stripe,
}: NavBarProps) {
  const scrolled = useScroll(50);
  const { isLoaded, isSignedIn, user } = useUser();

  const userObj = {
    name: user?.fullName || '',
    email: user?.emailAddresses[0]?.emailAddress || '',
  };

  const { isPaid } = stripe;

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
            <>
              {!isPaid ? (
                <UpgradeButton />
              ) : (
                <Button className={'bg-gradient_indigo-purple'}>
                  <Sparkles className="text-yellow-500 h-4 w-4 mr-2" />
                  Premium Member
                </Button>
              )}
              <UserAccountNav user={userObj} />
            </>
          ) : (
            <Link
              href="/signin"
              // className="flex gap-2 bg-transparent px-4 text-sm font-semibold hover:bg-transparent hover:text-purple-600"
              className={cn(
                buttonVariants({
                  variant: 'default',
                  size: 'sm',
                  rounded: 'lg',
                }),
                'bg-slate-800 text-sm font-semibold hover:bg-purple-600',
                'px-4'
              )}
            >
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
