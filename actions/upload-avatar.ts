'use server';

import { createClient } from '@supabase/supabase-js';
import { env } from '@/env.mjs';
import { prisma } from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';

const supabase = createClient(
  env.SUPABASE_PROJECT_URL,
  env.SUPABASE_SECRET_KEY
);

export async function uploadAvatar(form: FormData) {
  const file = form.get('file') as File;
  const userId = form.get('userId') as string;
  console.log('Uploading avatar...');

  const user = await currentUser();

  if (!user) {
    console.log('Unauthorized');
    return { error: 'Unauthorized' };
  }

  if (!file || !userId) {
    console.log('File or user ID is missing');
    return { error: 'File or user ID is missing' };
  }

  // Check file type
  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    console.log('Please select a JPEG or PNG image.');
    return { error: 'Please select a JPEG or PNG image.' };
  }

  // Check file size (1MB = 1048576 bytes)
  if (file.size > 1048576) {
    console.log('File size should be less than 1MB.');
    return { error: 'File size should be less than 1MB.' };
  }

  const fileExt = file.name.split('.').pop();
  const filePath = `${userId}.${fileExt}`;

  console.log('started upload');

  try {
    const { error } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (error) throw error;
    const photoUrl = `https://tqbquifstcxowvavjpis.supabase.co/storage/v1/object/public/avatars/${filePath}`;

    const new_profile = await prisma.linkedInProfile.update({
      where: { userEmail: user.emailAddresses[0].emailAddress },
      data: {
        photoUrl,
      },
    });

    console.log(new_profile);
    console.log('Successful to prisma');
    console.log('Avatar uploaded successfully');
    return { success: true, linkedinProfile: new_profile };
  } catch (error) {
    console.error('Error uploading avatar:', error);
    return { error: 'Error uploading avatar. Please try again.' };
  }
}
