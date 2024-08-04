'use client';

import React, { useState } from 'react';
import {
  Link,
  Sparkles,
  Loader,
  Globe,
  Layout,
  LineChart,
  Headphones,
  Wand2 as MagicWand,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface UpgradeCardProps {
  title: string;
  border?: boolean;
  sparkle?: boolean;
}

const features = [
  {
    icon: Globe,
    text: 'Your own custom domain (e.g., yourname.com)',
  },
  {
    icon: Link,
    text: 'No Linkify branding on your website',
  },
  {
    icon: Layout,
    text: 'Access to premium templates',
  },
  {
    icon: LineChart,
    text: 'Website visitor statistics',
  },
  {
    icon: Headphones,
    text: 'Priority customer support',
  },
  {
    icon: MagicWand,
    text: 'AI-powered content generation',
  },
  {
    icon: Sparkles,
    text: 'And much more',
  },
];

export function UpgradeCard({ title, border, sparkle = true }: UpgradeCardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = () => {
    setIsLoading(true);
    router.push('/dashboard/checkout');
  };

  return (
    <Card
      className={cn(
        'w-full max-w-lg mx-auto',
        border && 'border-purple-500 border-2'
      )}
    >
      <CardHeader>
        <CardTitle className="text-gradient_indigo-purple flex items-center gap-2 text-2xl font-bold">
          {sparkle && <Sparkles className="size-6 text-yellow-500" />}
          {title}
        </CardTitle>
      </CardHeader>
      <UpgradeCardContent />
      <CardFooter>
        <Button
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          onClick={handleUpgrade}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className="animate-spin mr-2" size={16} />
          ) : (
            'Upgrade Now'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

function UpgradeCardContent() {
  return (
    <>
      <CardContent>
        <p className="text-lg mb-4 text-gray-500">
          Elevate your profile with our exclusive premium features!
        </p>
        <div className="grid gap-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 font-semibold">
              <div className="rounded-full bg-purple-100 p-2">
                <feature.icon className="size-6 text-purple-600" />
              </div>
              <div className="text-sm">
                <p>{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </>
  );
}
