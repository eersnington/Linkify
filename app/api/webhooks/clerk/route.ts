import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { WebhookEvent } from '@clerk/nextjs/server';
import { Webhook } from 'svix';

import { prisma } from '@/lib/db';
import { tempStore } from '@/lib/temp-store';
import { v4 as uuidv4 } from 'uuid';
import { env } from '@/env.mjs';

export const maxDuration = 30;

export async function POST(req: Request) {
  const WEBHOOK_SECRET = env.CLERK_WEBHOOK_SECRET;

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
    console.log('- Clerk Payload Type: ', payload.type);

    /*
     * User deletion action
     * This action is triggered when a user is deleted from Clerk
     */
    if (payload.type === 'user.deleted') {
      // action for deleting user
      console.log('Action: Deleting user - ', id);

      const user = await prisma.user.findFirst({
        where: { id: id },
      }); // to get the email of the user

      const user_email = user?.email;
      console.log('User email:', user_email);

      if (!user_email) {
        console.error('No email found for user');
        return new NextResponse('No email found for user', { status: 400 });
      }

      console.log('Awaiting user deletion');

      await prisma.user.delete({
        where: { email: user_email },
      });

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
      /*
       * User upsert action
       * This action is triggered when a user is created or updated in Clerk
       */
      const { id, email_addresses, first_name, last_name, image_url } =
        payload?.data;

      const email = email_addresses[0]?.email_address;
      console.log('Action: Upsert user - ', email);
      console.log('- Clerk Payload Type: ', payload.type);

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

      const linkedInProfileData = tempStore.get(email);
      console.log(linkedInProfileData);

      if (linkedInProfileData) {
        console.log('Updating LinkedIn profile and website for user:', email);

        const websiteName = uuidv4().substring(0, 6).toUpperCase();

        await prisma.linkedInProfile.upsert({
          where: { userEmail: email },
          update: {
            id: id,
            userEmail: email,
            firstName: linkedInProfileData?.firstName || '',
            lastName: linkedInProfileData?.lastName || '',
            title: linkedInProfileData?.title || '',
            description: linkedInProfileData?.description || '',
            linkedInUrl: linkedInProfileData?.linkedInUrl || '',
            photoUrl: linkedInProfileData?.photoUrl || '',
            workExperiences: linkedInProfileData?.workExperiences || [],
            education: linkedInProfileData?.education || [],
            skills: linkedInProfileData?.skills || [],
          },
          create: {
            id: id,
            userEmail: email,
            firstName: linkedInProfileData?.firstName || '',
            lastName: linkedInProfileData?.lastName || '',
            title: linkedInProfileData?.title || '',
            description: linkedInProfileData?.description || '',
            linkedInUrl: linkedInProfileData?.linkedInUrl || '',
            photoUrl: linkedInProfileData?.photoUrl || '',
            workExperiences: linkedInProfileData?.workExperiences || [],
            education: linkedInProfileData?.education || [],
            skills: linkedInProfileData?.skills || [],
          },
        });

        await prisma.website.upsert({
          where: { userEmail: email },
          update: {
            userEmail: email,
            domainName: websiteName,
          },
          create: {
            userEmail: email,
            domainName: websiteName,
            firstName: linkedInProfileData?.firstName,
            template: 0,
          },
        });
      }

      console.log('User updated in database successfully');

      return new NextResponse('User updated in database successfully', {
        status: 200,
      });
    }
  } catch (error) {
    console.error('Error updating database:', error);
    return new NextResponse('Error updating user in database', { status: 500 });
  }
}
