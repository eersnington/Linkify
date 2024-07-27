'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button, buttonVariants } from './ui/button';

import { Sparkles, Crown, Zap } from 'lucide-react';
import router from 'next/router';

export function UpgradeButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={'bg-purple-600 '}>
          <Sparkles className="text-yellow-500 h-4 w-4 mr-2" />
          Upgrade to Premium
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-50 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-gradient_indigo-purple flex items-center gap-2 text-2xl font-bold">
            <Sparkles className="size-6 text-yellow-500" />
            Unlock Premium Theme
          </DialogTitle>
          <DialogDescription className="text-lg">
            Elevate your profile with our exclusive premium theme!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-purple-100 p-2">
              <Sparkles className="size-6 text-purple-600" />
            </div>
            <div className="text-sm">
              <p className="font-semibold">Enhanced Visual Appeal</p>
              <p className="text-gray-500">Stand out with unique designs</p>
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
              <p className="text-gray-500">
                Custom domain, web analytics, and AI content
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => router.push('/dashboard/billing')}
          >
            Subscribe Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
