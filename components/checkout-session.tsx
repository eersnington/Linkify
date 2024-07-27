'use client';

import { generateUserStripe } from '@/actions/generate-user-stripe';
import React, { useEffect, useState, useTransition } from 'react';
import { pricingData } from '@/config/subscriptions';
import { SubscriptionPlan, UserSubscriptionPlan } from '@/types';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/shared/icons';
import { AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BillingFormButtonProps {
  offer: SubscriptionPlan;
  subscriptionPlan: UserSubscriptionPlan;
  year: boolean;
}

const CheckoutSessionStripe = ({
  year,
  offer,
  subscriptionPlan,
}: BillingFormButtonProps) => {
  if (!offer) {
    throw new Error('Offer not found');
  }

  let [isPending, startTransition] = useTransition();
  const router = useRouter();

  const generateUserStripeSession = generateUserStripe.bind(
    null,
    // @ts-ignore
    offer.stripeIds[year ? 'yearly' : 'monthly']
  );

  const userOffer =
    subscriptionPlan.stripePriceId ===
    offer.stripeIds[year ? 'yearly' : 'monthly'];

  useEffect(() => {
    if (userOffer) {
      return router.push('/dashboard/billing');
    } else {
      startTransition(async () => await generateUserStripeSession());
    }
  }, [generateUserStripeSession, router, userOffer]);

  return (
    <div className="text-center p-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
      <p className="text-lg font-semibold mb-2">Preparing your checkout...</p>
      <p className="text-sm text-gray-600">
        You&apos;ll be redirected to Stripe&apos;s secure checkout page in a
        moment.
      </p>
    </div>
  );
};

export default CheckoutSessionStripe;
