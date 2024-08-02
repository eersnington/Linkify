import * as React from 'react';
import Link from 'next/link';

import { footerLinks, siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { ModeToggle } from '@/components/layout/mode-toggle';

import { NewsletterForm } from '../forms/newsletter-form';
import { Icons } from '../shared/icons';

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn('border-t', className)}>
      {/* <div className="container grid grid-cols-1 gap-6 py-14 sm:grid-cols-2 md:grid-cols-5">
        {footerLinks.map((section) => (
          <div key={section.title}>
            <span className="text-sm font-medium text-foreground">
              {section.title}
            </span>
            <ul className="mt-4 list-inside space-y-3">
              {section.items?.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="flex flex-col  items-end md:col-span-2">
          <NewsletterForm />
        </div>
      </div> */}

      <div className="border-t py-4">
        <div className="container flex items-center justify-center">
          {/* 
            If you want to mention Copyright for your LLP | Pvt Ltd, uncomment the lines below
           */}
          {/* <span className="text-muted-foreground text-sm">
            Copyright &copy; 2024. All rights reserved.
          </span> */}
          <p className="text-left text-sm text-muted-foreground">
            Brought to you by{' '}
            <Link
              href={'#'}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Belgravia Software Limited
            </Link>
            .{' '}
            <Link
              href="/terms"
              target="_blank"
              rel="noreferrer"
              className="font-medium hover:underline underline-offset-4"
            >
              Terms and Conditions
            </Link>{' '}
            |{' '}
            <Link
              href="/privacy"
              target="_blank"
              rel="noreferrer"
              className="font-medium hover:underline underline-offset-4"
            >
              Privacy Policy
            </Link>{' '}
            |{' '}
            <Link
              href={`mailto:${siteConfig.mailSupport}`}
              target="_blank"
              rel="noreferrer"
              className="font-medium hover:underline underline-offset-4"
            >
              {siteConfig.mailSupport}
            </Link>
          </p>

          {/* <div className="flex items-center gap-3">
            <ModeToggle />
          </div> */}
        </div>
      </div>
    </footer>
  );
}
