'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { UserSubscriptionPlan } from '@/types';

import { paymentSupport, pricingData } from '@/config/subscriptions';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { BillingFormButton } from '@/components/forms/billing-form-button';
import { Icons } from '@/components/shared/icons';

import { SubscriptionPlan } from '../types/index';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { useRouter } from 'next/navigation';
import { useSignupModal } from '@/hooks/use-signup-modal';

interface PricingCardsProps {
  userId?: string;
  subscriptionPlan?: UserSubscriptionPlan;
}

export function PricingCards({ userId, subscriptionPlan }: PricingCardsProps) {
  const isYearlyDefault =
    !subscriptionPlan?.stripeCustomerId || subscriptionPlan.interval === 'year';
  const [isYearly, setIsYearly] = useState<boolean>(isYearlyDefault);
  const router = useRouter();
  const signUpModal = useSignupModal();

  const toggleBilling = () => {
    setIsYearly(!isYearly);
  };

  const freePlan = pricingData.find((plan) => plan.title === 'Standard');
  const paidPlan = pricingData.find((plan) => plan.title === 'Premium');

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const PricingCard = ({
    offer,
    isPaid,
    delay,
  }: {
    offer: SubscriptionPlan;
    isPaid: boolean;
    delay: number;
  }) => {
    return (
      <motion.div
        className={cn(
          'relative flex w-full max-w-2xl flex-col overflow-hidden rounded-3xl shadow-lg',
          isPaid
            ? 'bg-purple-500 text-white'
            : 'bg-white text-purple-950 border border-purple-200'
        )}
        key={offer.title}
        variants={cardVariants}
      >
        <div className="min-h-[180px] items-start space-y-6 p-8">
          <p className="flex font-urban text-xl font-bold tracking-wider">
            {offer.title}
          </p>

          <div className="flex flex-row">
            <div className="flex items-end">
              <div className="flex text-left text-5xl font-semibold leading-tight">
                {isPaid ? (
                  isYearly ? (
                    <>
                      <span className="mr-3 line-through opacity-70">
                        ${offer.prices.monthly}
                      </span>
                      <span>${offer.prices.yearly}</span>
                    </>
                  ) : (
                    `${offer.prices.monthly}`
                  )
                ) : (
                  'Free'
                )}
              </div>
              {isPaid && (
                <div className="-mb-1 ml-3 text-left text-xl font-medium">
                  <div>/year</div>
                </div>
              )}
            </div>
          </div>
          {isPaid ? (
            <div className="text-left text-lg">
              {isYearly
                ? `Unleash Your Professional Potential` // I need another text here as the prices are just yearly now
                : 'when charged monthly'}
            </div>
          ) : (
            <div className="text-left text-lg">Lifetime Free</div>
          )}
        </div>

        <div className="flex h-full flex-col justify-between gap-16 p-8">
          <ul className="space-y-4 text-left text-lg font-medium leading-normal">
            {offer.benefits.map((feature) => (
              <li className="flex items-start gap-x-4" key={feature}>
                <Icons.check
                  className={cn(
                    'size-6 shrink-0 font-semibold',
                    isPaid ? 'text-white' : 'text-purple-500'
                  )}
                />
                <p>{feature}</p>
              </li>
            ))}
          </ul>

          {userId && subscriptionPlan ? (
            offer.title === 'Standard' ? (
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({
                    variant: 'outline',
                    size: 'lg',
                    rounded: 'full',
                  }),
                  'w-full bg-purple-500 text-sm font-semibold text-white'
                )}
              >
                Go to dashboard
              </Link>
            ) : (
              <BillingFormButton
                year={isYearly}
                offer={offer}
                subscriptionPlan={subscriptionPlan}
              />
            )
          ) : (
            <Button
              variant={'outline'}
              size="lg"
              onClick={() => {
                signUpModal.onOpen();
              }}
              className={cn(
                'text-base font-semibold rounded-full',
                isPaid
                  ? 'bg-white text-purple-500 hover:bg-purple-100'
                  : 'bg-purple-500 text-white hover:bg-purple-600'
              )}
            >
              Get Started
            </Button>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <section className="container flex flex-col items-center text-center">
      <motion.h1
        className="font-heading text-3xl md:text-6xl text-purple-950"
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        {'Pricing'}
      </motion.h1>

      {/* <motion.div
        className="mb-4 mt-10 flex items-center gap-5"
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        <ToggleGroup
          type="single"
          size="sm"
          defaultValue={isYearly ? 'annually' : 'monthly'}
          onValueChange={toggleBilling}
          aria-label="toggle-year"
          className="h-9 overflow-hidden rounded-lg border border-purple-500 bg-background p-1 *:h-7 *:text-muted-foreground"
        >
          <ToggleGroupItem
            value="annually"
            className="rounded-lg px-5 data-[state=on]:!bg-purple-500 data-[state=on]:!text-primary-foreground"
            aria-label="Toggle anually billing"
          >
            Annually (-20%)
          </ToggleGroupItem>
          <ToggleGroupItem
            value="monthly"
            className="rounded-lg px-5 data-[state=on]:!bg-purple-500 data-[state=on]:!text-primary-foreground"
            aria-label="Toggle monthly billing"
          >
            Monthly
          </ToggleGroupItem>
        </ToggleGroup>
      </motion.div> */}

      <motion.div
        className="mx-auto grid max-w-7xl gap-12 bg-inherit py-8 md:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {freePlan && <PricingCard offer={freePlan} isPaid={false} delay={0} />}
        {paidPlan && <PricingCard offer={paidPlan} isPaid={true} delay={0} />}
      </motion.div>

      <p className="mt-3 text-balance text-center text-base text-purple-700">
        Email{' '}
        <a
          className="font-medium text-primary hover:underline"
          href={`mailto:${paymentSupport.email}`}
        >
          {paymentSupport.email}
        </a>{' '}
        for to contact our support team.
        <br />
        <strong>{paymentSupport.message2} </strong>
      </p>
    </section>
  );
}
