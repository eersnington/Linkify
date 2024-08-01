'use server';

import { prisma } from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';

function validateDomainName(domainName: string): string | boolean {
  // Check length
  if (domainName.length < 3 || domainName.length > 20) {
    return 'Domain name must be between 1 and 20 characters long';
  }

  // Check for valid characters and format
  const validDomainRegex = /^[a-z0-9]+(?:[-_][a-z0-9]+)*$/;
  if (!validDomainRegex.test(domainName)) {
    return 'Invalid domain name format. Use only lowercase letters, numbers, hyphens, and underscores. Hyphens and underscores cannot be at the start or end.';
  }

  return false; // No error
}

export async function publishWebsite(
  email: string,
  domainName: string,
  template: number
) {
  const user = await currentUser();

  if (!user || user.emailAddresses[0].emailAddress !== email) {
    return { status: 'error', error: 'Unauthorized' };
  }

  console.log('Publishing website for', email);
  // Validate domain name
  const validationError = validateDomainName(domainName);
  if (validationError !== false) {
    return { status: 'error', error: validationError };
  }

  console.log(`Publishing website for ${email} with domain name ${domainName}`);

  try {
    const existingWebsite = await prisma.website.findFirst({
      where: { domainName },
    });

    if (existingWebsite && existingWebsite.userEmail !== email) {
      return { status: 'error', error: 'Domain name already in use' };
    }

    const website = await prisma.website.upsert({
      where: { userEmail: email },
      create: {
        id: user.id,
        firstName: user.firstName,
        domainName,
        userEmail: email,
        template,
      },
      update: {
        id: user.id,
        firstName: user.firstName,
        userEmail: email,
        domainName,
        template,
      },
    });

    return { status: 'success', website };
  } catch (error) {
    console.error('Failed to publish website:', error);
    return { status: 'error', error: 'Failed to publish website' };
  }
}
