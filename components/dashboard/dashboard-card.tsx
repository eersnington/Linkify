'use client';

import {
  ExternalLink,
  Loader,
  PlusSquare,
  Sparkles,
  Crown,
  Zap,
} from 'lucide-react';
import { PageViewsChart } from '../charts/page-view-chart';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useState } from 'react';
import { Website, User } from '@prisma/client';
import { env } from '@/env.mjs';
import { useRouter } from 'next/navigation';
import { UpgradeCard } from '../upgrade-card';

const rootDomain = env.NEXT_PUBLIC_ROOT_DOMAIN;
const protocol = rootDomain === 'localhost:3000' ? `http://` : `https://`;

interface DashboardCardsProps {
  website?: Website | null;
  domainName?: string;
  userDb?: User | null;
  isPremium: boolean;
}

export default function DashboardCards({
  website,
  userDb,
  domainName,
  isPremium,
}: DashboardCardsProps) {
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();

  if (!website) {
    return (
      <Card className="shadow-md rounded-md py-8">
        <CardContent className="flex flex-col items-center justify-center">
          <span className="text-lg font-medium">
            You don&apos;t have a website yet.
          </span>
          <span className="text-sm text-gray-500 mt-2">
            Let&apos;s get you started by creating one!
          </span>
          <Button
            disabled={isClicked}
            variant="default"
            className="mt-4 bg-purple-500"
            onClick={() => {
              setIsClicked(true);
            }}
          >
            {isClicked ? (
              <Loader className="animate-spin" />
            ) : (
              <Link href="/mypage">
                <PlusSquare className="inline" /> Create Website
              </Link>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      <Card className="shadow-md rounded-md">
        <CardHeader>
          <CardTitle>
            Website Performance{' '}
            <Badge className="inline-flex items-center justify-center text-center bg-gray-800 p-2">
              <Link
                href={
                  userDb?.domain
                    ? `https://${userDb?.domain}`
                    : `${protocol}${domainName}.${rootDomain}`
                }
                target="_blank"
                className="text-white hover:underline flex items-center"
              >
                {userDb?.domain
                  ? `${userDb?.domain}`
                  : `${domainName}.${rootDomain}`}{' '}
                <ExternalLink className="ml-2" size={12} />
              </Link>
            </Badge>
          </CardTitle>
          <CardDescription>
            Overview of your website&apos;s traffic
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isPremium ? (
            <PageViewsChart path={website.domainName} />
          ) : (
            <UpgradeCard title={'Want to see your website visitors?'} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
