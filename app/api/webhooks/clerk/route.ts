// This function can run for a maximum of 5 seconds

import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { WebhookEvent } from '@clerk/nextjs/server';
import { Webhook } from 'svix';

import { prisma } from '@/lib/db';

export const maxDuration = 30;

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to your Environment Variables'
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('Error occured in verifying Clerk webhook');
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured with verifying webhook', {
      status: 400,
    });
  }

  console.log('✅ ClerkAuth Webhook verified!');

  try {
    const { id } = payload?.data;
    // console.log('✅', payload); // Uncomment to see the payload

    console.log(payload.type);

    if (payload.type === 'user.deleted') {
      // action for deleting user
      console.log('Action: Deleting user - ', id);

      const user = await prisma.user.findFirst({
        where: { id: id },
      }); // to get the email of the user

      console.log('Awaiting user deletion');
      await prisma.user.delete({
        where: { email: user?.email },
      });

      const user_email = user?.email;

      console.log('Awaiting website deletion');
      const website = await prisma.website.findFirst({
        where: { userEmail: user_email },
      });

      if (website) {
        await prisma.website.delete({
          where: { userEmail: user_email },
        });
      }

      console.log('Awaiting LinkedIn profile deletion');
      const linkedin = await prisma.linkedInProfile.findFirst({
        where: { userEmail: user_email },
      });

      if (linkedin) {
        await prisma.linkedInProfile.delete({
          where: { userEmail: user_email },
        });
      }
      return new NextResponse('User deleted from database successfully', {
        status: 200,
      });
    } else {
      const { email_addresses, first_name, last_name, image_url } =
        payload?.data;

      const email = email_addresses[0]?.email_address;
      console.log('Action: Upsert user - ', email);
      console.log(payload.type);

      await prisma.user.upsert({
        where: { email: email },
        update: {
          id,
          email,
          firstName: first_name,
          lastName: last_name,
          image: image_url,
        },
        create: {
          id: id,
          email,
          firstName: first_name || '',
          lastName: last_name || '',
          image: image_url || '',
        },
      });

      return new NextResponse('User updated in database successfully', {
        status: 200,
      });
    }
  } catch (error) {
    console.error('Error updating database:', error);
    return new NextResponse('Error updating user in database', { status: 500 });
  }
}
