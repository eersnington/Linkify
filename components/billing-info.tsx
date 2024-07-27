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
          You are currently on the <strong>{title}</strong> plan.
        </CardDescription>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
        {isPaid && stripeCustomerId ? (
          <CustomerPortalButton userStripeId={stripeCustomerId} />
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button className={cn(buttonVariants())}>Choose a plan</Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-50 sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-gradient_indigo-purple flex items-center gap-2 text-2xl font-bold">
                  <Sparkles className="size-6 text-yellow-500" />
                  Unlock Premium Theme
                </DialogTitle>
                <DialogDescription className="text-lg">
                  Elevate your profile with our exclusive premium theme!
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-purple-100 p-2">
                    <Sparkles className="size-6 text-purple-600" />
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold">Enhanced Visual Appeal</p>
                    <p className="text-gray-500">
                      Stand out with unique designs
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-purple-100 p-2">
                    <Crown className="size-6 text-purple-600" />
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold">Professional Edge</p>
                    <p className="text-gray-500">Impress potential employers</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-purple-100 p-2">
                    <Zap className="size-6 text-purple-600" />
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold">Advanced Features</p>
                    <p className="text-gray-500">
                      Custom domain, web analytics, and AI content
                    </p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() => router.push('/pricing')}
                >
                  Subscribe Now
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
