'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function onboardFormSubmit(source: string, userId: string | undefined) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  try {
    await prisma.source.create({
      data: {
        userId: userId,
        source: source,
      },
    });
    revalidatePath('/dashboard');
  } catch (error) {
    console.error('Error saving source data:', error);
    throw new Error('Failed to save source data');
  }
}
