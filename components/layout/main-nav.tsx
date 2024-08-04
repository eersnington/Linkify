'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

import { MainNavItem } from 'types';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { MobileNav } from '@/components/layout/mobile-nav';
import { Icons } from '@/components/shared/icons';

import Logo from '../shared/logo';

interface MainNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
  isDashboard?: boolean;
}

export function MainNav({ items, children, isDashboard }: MainNavProps) {
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  React.useEffect(() => {
    const closeMobileMenuOnClickOutside = (event: MouseEvent) => {
      if (showMobileMenu) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener('click', closeMobileMenuOnClickOutside);

    return () => {
      document.removeEventListener('click', closeMobileMenuOnClickOutside);
    };
  }, [showMobileMenu]);

  return (
    <div className="flex gap-6 md:gap-10">
      <Link
        href={isDashboard ? '/dashboard' : '/'}
        className="hidden items-center space-x-2 md:flex "
      >
        <Logo />
        <span className="hidden font-urban text-xl font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? '#' : item.href}
              prefetch={true}
              className={cn(
                'flex items-center text-lg font-semibold transition-colors hover:text-purple-600 sm:text-sm',
                item.href.startsWith(`/${segment}`)
                  ? 'text-foreground'
                  : 'text-foreground/60',
                item.disabled && 'cursor-not-allowed opacity-80'
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={toggleMobileMenu}
      >
        {showMobileMenu ? <Icons.close /> : <Logo />}
        {items != undefined ? (
          <span className="font-bold">Menu</span>
        ) : (
          <span className="font-bold">{siteConfig.name}</span>
        )}
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  );
}
