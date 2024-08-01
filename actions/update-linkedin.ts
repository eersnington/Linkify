'use server';

import { z } from 'zod';
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';
import { AILinkedInProfileSchema } from '@/lib/validations/linkedin-profile';
import { LinkedInProfile } from '@prisma/client';

export async function updateLinkedInProfile(
  email: string,
  data: LinkedInProfile
) {
  const user = await currentUser();

  if (!user || user.emailAddresses[0].emailAddress !== email) {
    return { status: 'error', message: 'Unauthorized' };
  }

  console.log(`Updating LinkedIn profile for ${email}`);

  try {
    const validatedData = AILinkedInProfileSchema.parse(data);

    await prisma.linkedInProfile.upsert({
      where: { id: user.id },
      update: {
        id: user.id,
        userEmail: email,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        title: validatedData.title,
        description: validatedData.description,
        linkedInUrl: validatedData.linkedInUrl,
        photoUrl: validatedData.photoUrl,
        workExperiences: validatedData.workExperiences,
        education: validatedData.education,
        skills: validatedData.skills,
      },
      create: {
        id: user.id,
        userEmail: email,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        title: validatedData.title,
        description: validatedData.description,
        linkedInUrl: validatedData.linkedInUrl,
        photoUrl: validatedData.photoUrl,
        workExperiences: validatedData.workExperiences,
        education: validatedData.education,
        skills: validatedData.skills,
      },
    });

    return {
      status: 'success',
      message: 'LinkedIn profile updated successfully',
    };
  } catch (error) {
    console.error('Error updating LinkedIn profile:', error);
    if (error instanceof z.ZodError) {
      return {
        status: 'error',
        message: 'Invalid data provided',
        errors: error.errors,
      };
    }
    return { status: 'error', message: 'Failed to update LinkedIn profile' };
  }
}
