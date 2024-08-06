'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function onboardFormSubmit(
  source: string,
  userId: string | undefined
) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  console.log(userId);

  try {
    await prisma.source.upsert({
      where: { userId },
      update: {
        source,
      },
      create: {
        source,
        userId,
      },
    });
    console.log('submitted');
    revalidatePath('/dashboard');
  } catch (error) {
    console.error('Error saving source data:', error);
    throw new Error('Failed to save source data');
  }
}
