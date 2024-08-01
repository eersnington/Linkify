'use server';

import { prisma } from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';

export async function getLinkedInProfile() {
  const user = await currentUser();

  if (!user) {
    throw new Error('User not found');
  }

  // Fetch LinkedIn Profile for the user

  const linkedInProfile = await prisma.linkedInProfile.findFirst({
    where: {
      userEmail: user.emailAddresses[0].emailAddress,
    },
  });

  return linkedInProfile;
}
