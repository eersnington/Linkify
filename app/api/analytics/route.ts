// api/analytics/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  console.log('Analytics API called by ', request.headers.get('host'));
  const { page, referrer, userAgent, country } = await request.json();
  const userDomain = request.headers.get('host') || '';
  try {
    const cleanedPage = page.startsWith('/') ? page.substring(1) : page;
    const website = await prisma.website.findUnique({
      where: { domainName: cleanedPage },
    });
    if (!website) {
      return NextResponse.json(
        { message: 'Website not found' },
        { status: 404 }
      );
    }
    await prisma.pageView.create({
      data: {
        page: cleanedPage,
        referrer,
        userAgent,
        country,
        timestamp: new Date(),
        websiteId: website.id,
      },
    });
    console.log('Analytics recorded!');
    return NextResponse.json(
      { message: 'Analytics recorded' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error recording analytics:', error);
    return NextResponse.json(
      { message: 'Error recording analytics' },
      { status: 500 }
    );
  }
}
