'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UpgradeCard } from './upgrade-card';
import { UserSubscriptionPlan } from 'types';
import { cn, formatDate } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Globe,
  Headphones,
  Layout,
  LineChart,
  Mail,
  Sparkles,
  Wand2 as MagicWand,
} from 'lucide-react';
import { siteConfig } from '@/config/site';

interface BillingInfoProps {
  userSubscriptionPlan: UserSubscriptionPlan;
}

const features = [
  {
    icon: Globe,
    text: 'Your own custom domain (e.g., yourname.com)',
  },
  {
    icon: Layout,
    text: 'Access to premium templates',
  },
  {
    icon: LineChart,
    text: 'Website visitor statistics',
  },
  {
    icon: Headphones,
    text: 'Priority customer support',
  },
  {
    icon: MagicWand,
    text: 'AI-powered content generation',
  },
];

export function BillingInfo({ userSubscriptionPlan }: BillingInfoProps) {
  const router = useRouter();
  const {
    title,
    description,
    stripeCustomerId,
    isPaid,
    isCanceled,
    stripeCurrentPeriodEnd,
  } = userSubscriptionPlan;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Subscription Plan</CardTitle>
        <CardDescription className="text-base">
          You are currently on the{' '}
          <strong className={isPaid ? 'text-purple-500' : 'text-gray-500'}>
            {title}
          </strong>{' '}
          plan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isPaid && stripeCustomerId ? (
          <Card className="w-full mt-4">
            <CardHeader>
              <CardTitle className="text-gradient_indigo-purple flex items-center gap-2 text-2xl font-bold">
                Awesome, you&apos;re a Pro{' '}
                <Sparkles className="size-6 text-yellow-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {features.map(({ icon: Icon, text }, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Icon className="size-4 text-purple-500" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ) : (
          <Card className="w-full mt-4">
            <CardHeader>
              <CardTitle className="text-gradient_indigo-purple flex items-center gap-2 text-2xl font-bold">
                <Sparkles className="size-6 text-yellow-500" />
                Upgrade to Pro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {features.map(({ icon: Icon, text }, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Icon className="size-4 text-purple-500" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-y-0">
        {isPaid && stripeCustomerId ? (
          <Button className="bg-purple-500 hover:bg-purple-600">
            <Link
              href={`mailto:${siteConfig.mailSupport}?subject=Issue with Billing`}
              className="inline-flex items-center"
            >
              <Mail size={16} className="mr-2" /> Contact Billing Support
            </Link>
          </Button>
        ) : (
          <Button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => router.push('/dashboard/checkout')}
          >
            Subscribe Now
          </Button>
        )}
        {isPaid && (
          <p className="rounded-full text-xs font-medium">
            {isCanceled
              ? 'Your plan will be canceled on '
              : 'Your plan renews on '}
            {formatDate(stripeCurrentPeriodEnd)}.
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
