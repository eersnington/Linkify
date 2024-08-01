import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { PageViewsChart } from '@/components/charts/page-view-chart';
import { prisma } from '@/lib/db';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardShell } from '@/components/dashboard/shell';
import { ExternalLink, PlusSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { env } from '@/env.mjs';

const url = env.NEXT_PUBLIC_ROOT_DOMAIN;

export const metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage() {
  const user = await currentUser();

  const website = await prisma.website.findFirst({
    where: { userEmail: user?.emailAddresses[0].emailAddress },
  });

  const userDb = await prisma.user.findFirst({
    where: { id: user?.id },
  });

  const domainName = website?.domainName;

  return (
    <DashboardShell className="">
      <DashboardHeader heading="Dashboard" text="View Your Web Analytics" />
      <div className="grid gap-4">
        {website ? (
          <Card className="shadow-md rounded-md">
            <CardHeader>
              <CardTitle>
                Website Performance{' '}
                <Badge className="text-center items-center">
                  <Link
                    href={
                      userDb?.domain
                        ? `https://${userDb?.domain}`
                        : `https://${domainName}.${url}`
                    }
                    target="_blank"
                    className="text-white hover:underline flex items-center justify-center mt-2"
                  >
                    {userDb?.domain
                      ? `https://${userDb?.domain}`
                      : `https://${domainName}.${url}`}{' '}
                    <ExternalLink className="ml-2" size={12} />
                  </Link>
                </Badge>
              </CardTitle>
              <CardDescription>
                Overview of your website&apos;s traffic
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PageViewsChart path={website?.domainName} />
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-md rounded-md py-8">
            <CardContent className="flex flex-col items-center justify-center">
              <span className="text-lg font-medium">
                You don&apos;t have a website yet.
              </span>
              <span className="text-sm text-gray-500 mt-2">
                Let&apos;s get you started by creating one!
              </span>
              <Button variant="default" className="mt-4 bg-purple-500">
                <Link href="/mypage">
                  <PlusSquare className="inline" /> Create Website
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardShell>
  );
}
