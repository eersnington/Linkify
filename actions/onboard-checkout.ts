'use server';

import { redirect } from 'next/navigation';
import { stripe } from '@/lib/stripe';
import { absoluteUrl } from '@/lib/utils';
import { useClerk } from '@clerk/nextjs';
import { prisma } from '@/lib/db';
import { createClerkClient } from '@clerk/backend';

export type responseAction = {
  status: 'success' | 'error';
  stripeUrl?: string;
};

const billingUrl = absoluteUrl('/dashboard/billing');
const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function generateStripeCheckoutForUnsignedUser(
  email: string,
  firstName: string,
  lastName: string,
  priceId: string
): Promise<responseAction> {
  let redirectUrl: string = '';

  try {
    if (!email) {
      throw new Error('Email is required');
    }

    const clerkUser = await clerkClient.users.createUser({
      emailAddress: [email],
      firstName: firstName,
      lastName: lastName,
    });

    console.log('Clerk user created', clerkUser.id);
    const dbUser = await prisma.user.create({
      data: {
        id: clerkUser.id,
        email,
        firstName,
        lastName,
      },
    });

    console.log('DB user created');

    // Create a checkout session for the unsigned user
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ['card'],
      mode: 'subscription',
      billing_address_collection: 'auto',
      customer_email: email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: clerkUser.id,
      },
    });

    redirectUrl = stripeSession.url as string;

    if (!redirectUrl) {
      throw new Error('Failed to generate Stripe checkout URL');
    }

    return {
      status: 'success',
      stripeUrl: redirectUrl,
    };
  } catch (error) {
    console.error('Error generating Stripe checkout:', error);
    return {
      status: 'error',
    };
  }
}
