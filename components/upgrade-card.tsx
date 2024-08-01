'use client';

import React from 'react';
import { Sparkles, Crown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export function UpgradeCard() {
  const router = useRouter();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-gradient_indigo-purple flex items-center gap-2 text-2xl font-bold">
          <Sparkles className="size-6 text-yellow-500" />
          Unlock Premium Features
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-4">
          Elevate your profile with our exclusive premium features!
        </p>
        <div className="grid gap-4">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-purple-100 p-2">
              <Sparkles className="size-6 text-purple-600" />
            </div>
            <div className="text-sm">
              <p className="font-semibold">Free Custom Domain</p>
              <p className="text-gray-500">Includes a .com/.dev/.pro domain</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-purple-100 p-2">
              <Crown className="size-6 text-purple-600" />
            </div>
            <div className="text-sm">
              <p className="font-semibold">Professional Edge</p>
              <p className="text-gray-500">Impress potential employers</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-purple-100 p-2">
              <Zap className="size-6 text-purple-600" />
            </div>
            <div className="text-sm">
              <p className="font-semibold">Advanced Features</p>
              <p className="text-gray-500">Web analytics and AI content</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          onClick={() => router.push('/dashboard/checkout')}
        >
          Upgrade Now
        </Button>
      </CardFooter>
    </Card>
  );
}
