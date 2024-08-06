import { headers } from 'next/headers';
import Stripe from 'stripe';

import { env } from '@/env.mjs';
import { prisma } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { createClerkClient } from '@clerk/backend';

const clerkClient = createClerkClient({
  secretKey: env.CLERK_SECRET_KEY,
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === 'checkout.session.completed') {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    // Update the user stripe into in our database.
    // Since this is the initial subscription, we need to update
    // the subscription id and customer id.
    const userEmail = session?.metadata?.userEmail as string;

    if (userEmail) {
      // create a new user with clerk
      const userFirstName = session?.metadata?.userFirstName as string;
      const userLastName = session?.metadata?.userLastName as string;

      try {
        const clerkUser = await clerkClient.users.createUser({
          emailAddress: [userEmail],
          firstName: userFirstName,
          lastName: userLastName,
        });
        console.log('Clerk user created from Stripe Endpoint:', userEmail);
        console.log('Creating user in Db: ', clerkUser.id);
        await prisma.user.create({
          data: {
            id: clerkUser.id,
            email: userEmail,
            firstName: userFirstName,
            lastName: userLastName,

            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer as string,
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(
              subscription.current_period_end * 1000
            ),
          },
        });

        console.log('DB user created with Stripe');
      } catch (error) {
        console.error('Error creating user:', error);

        // rare case of user already existing in clerk
        const user = await prisma.user.findUnique({
          where: {
            email: userEmail,
          },
        });

        if (!user) {
          console.error('No User found');
          return new Response('No User found', { status: 500 });
        }

        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer as string,
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(
              subscription.current_period_end * 1000
            ),
          },
        });
      }
    } else {
      await prisma.user.update({
        where: {
          id: session?.metadata?.userId,
        },
        data: {
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
        },
      });
    }
  }

  if (event.type === 'invoice.payment_succeeded') {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    // Update the price id and set the new period end.
    await prisma.user.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  }

  return new Response(null, { status: 200 });
}
