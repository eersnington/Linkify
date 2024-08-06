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
import {
  Sparkles,
  Loader,
  Globe,
  Layout,
  LineChart,
  Headphones,
  Wand2 as MagicWand,
  LinkIcon,
} from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const features = [
  {
    icon: Globe,
    text: 'Your own custom domain (e.g., yourname.com)',
  },
  {
    icon: LinkIcon,
    text: 'No Resumade branding on your website',
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

export function UpgradeButton() {
  const [isClicked, setClicked] = useState(false);

  const router = useRouter();
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
            Unlock Premium Features
          </DialogTitle>
          <DialogDescription className="text-lg">
            Elevate your profile with our exclusive premium features!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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
        <DialogFooter>
          <Button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700"
            disabled={isClicked}
            onClick={() => {
              setClicked(true);
              router.push('/dashboard/checkout');
            }}
          >
            {isClicked ? 'Processing...' : 'Upgrade Now'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
