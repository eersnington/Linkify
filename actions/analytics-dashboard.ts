'use server';
import { prisma } from '@/lib/db';

export async function getPageviews({ path }: { path: string }) {
  try {
    const pageviews = await prisma.pageView.findMany({
      where: { page: path },
    });
    return pageviews;
  } catch (error) {
    console.error('Error fetching pageviews:', error);
    throw new Error('Failed to fetch pageviews');
  }
}
