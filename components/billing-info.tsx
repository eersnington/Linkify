'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { UserSubscriptionPlan } from 'types';
import { cn, formatDate } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CustomerPortalButton } from '@/components/forms/customer-portal-button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles, Crown, Zap } from 'lucide-react';

interface BillingInfoProps extends React.HTMLAttributes<HTMLFormElement> {
  userSubscriptionPlan: UserSubscriptionPlan;
}

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
          {isPaid ? (
            <strong className="text-purple-500">{title}</strong>
          ) : (
            <strong className="text-gray-500">{title}</strong>
          )}{' '}
          plan.
        </CardDescription>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
        {isPaid && stripeCustomerId ? (
          <CustomerPortalButton userStripeId={stripeCustomerId} />
        ) : (
          <Button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => router.push('/dashboard/checkout')}
          >
            Subscribe Now
          </Button>
        )}
        {isPaid ? (
          <p className="rounded-full text-xs font-medium">
            {isCanceled
              ? 'Your plan will be canceled on '
              : 'Your plan renews on '}
            {formatDate(stripeCurrentPeriodEnd)}.
          </p>
        ) : null}
      </CardFooter>
    </Card>
  );
}
