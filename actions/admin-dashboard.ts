'use server';

import { prisma } from '@/lib/db';
import { error } from 'console';

function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function onAddAdminUser(email: string) {
  if (!isValidEmail(email)) {
    return { success: false, error: 'Invalid email format' };
  }

  try {
    const existingUser = await prisma.adminUser.findUnique({
      where: { userEmail: email },
    });

    if (existingUser) {
      return { success: false, error: 'Admin user already exists' };
    }

    await prisma.adminUser.create({
      data: { userEmail: email },
    });
    return { success: true, error: null };
  } catch (error) {
    console.error('Failed to add admin user:', error);
    return { success: false, error: 'Failed to add admin user' };
  }
}

export async function onDeleteAdminUser(id: string) {
  try {
    const existingUser = await prisma.adminUser.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return { success: false, error: 'Admin user not found' };
    }

    await prisma.adminUser.delete({
      where: { id },
    });
    return { success: true, error: null };
  } catch (error) {
    console.error('Failed to delete admin user:', error);
    return { success: false, error: 'Failed to delete admin user' };
  }
}
