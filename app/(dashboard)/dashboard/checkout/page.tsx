import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';

import { getUserSubscriptionPlan } from '@/lib/subscription';
import { BillingInfo } from '@/components/billing-info';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardShell } from '@/components/dashboard/shell';
import { pricingData } from '@/config/subscriptions';
import CheckoutSessionStripe from '@/components/checkout-session';

export const metadata = {
  title: 'Billing',
  description: 'Manage billing and your subscription plan.',
};

export default async function BillingPage() {
  const user = await currentUser();
  const offer = pricingData.find((plan) => plan.title === 'Premium');

  if (!offer) {
    throw new Error('Offer not found');
  }

  if (!user) {
    redirect('/login');
  }

  const userSubscriptionPlan = await getUserSubscriptionPlan(user.id);

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Checkout"
        text="Checkout and complete your purchase."
      />
      <div className="grid gap-8">
        <CheckoutSessionStripe
          offer={offer}
          subscriptionPlan={userSubscriptionPlan}
          year={true}
        />
      </div>
    </DashboardShell>
  );
}
