'use server';

import { stripe } from '@/lib/stripe';
import { absoluteUrl } from '@/lib/utils';
import Stripe from 'stripe';

export type responseAction = {
  status: 'success' | 'error';
  stripeUrl?: string;
};

const billingUrl = absoluteUrl('/dashboard/');

export async function generateStripeCheckoutForUnsignedUser(
  email: string,
  firstName: string,
  lastName: string,
  priceId: string,
  couponId?: string
): Promise<responseAction> {
  let redirectUrl: string = '';

  try {
    if (!email) {
      throw new Error('Email is required');
    }

    // Create a checkout session for the unsigned user
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
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
        userEmail: email,
        userFirstName: firstName,
        userLastName: lastName,
      },
    };

    // Add the discount coupon if provided
    if (couponId) {
      sessionParams.discounts = [
        {
          coupon: couponId,
        },
      ];
    }

    // Create a checkout session for the unsigned user
    const stripeSession = await stripe.checkout.sessions.create(sessionParams);

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
