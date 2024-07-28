'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ArrowRight, Check, Loader2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { useLinkedInData } from '@/context/linkedin-data-context';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Label } from '../ui/label';
import Logo from '../shared/logo';
import { pricingData } from '@/config/subscriptions';
import { DialogDescription } from '@radix-ui/react-dialog';

const features = [
  'Your own custom domain (e.g., yourname.com)',
  'Access to premium templates',
  'Website visitor statistics',
  'Priority customer support',
  'AI-powered content generation',
  'And much more',
];

export default function UpgradeCards({
  emailAddress,
}: {
  emailAddress: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { linkedInProfile } = useLinkedInData();
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      y: [0, -5, 0],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
    });
  }, [controls]);

  if (!linkedInProfile) {
    router.push('/onboard');
    return <div>Loading...</div>;
  }

  const { firstName, lastName } = linkedInProfile;

  return (
    <div className="min-h-screen w-full bg-gray-50 p-8 flex items-center justify-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Label className="text-purple-950 text-2xl font-semibold">
              <Logo className="h-6 w-auto" />
              Linkify
            </Label>
            <Image
              src="/images/web-designer.svg"
              alt="Web Designer"
              width="500"
              height="500"
              className="mx-auto"
            />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 border-2 border-purple-500"
        >
          <Card>
            <CardHeader className="text-purple-950">
              <motion.div animate={controls}>
                <CardTitle className="text-2xl font-bold flex items-center space-x-2">
                  <Star className="text-yellow-500" />
                  <span className="font-bold">
                    Unleash Your Professional Potential
                  </span>
                  <Star className="text-yellow-500" />
                </CardTitle>
              </motion.div>
              <p className="text-gray-600 font-semibold">
                Elevate Your Career with Premium Features
              </p>
            </CardHeader>
            <CardContent className="p-4">
              <ul className="space-y-2 mb-4">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center text-gray-700"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Check className="text-emerald-500 mr-2 h-5 w-5" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
              <motion.div
                className="text-center mb-4"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p className="text-2xl font-bold text-emerald-500 mb-2">
                  <span className="line-through text-gray-400 text-xl mr-2">
                    ${pricingData[1].prices.monthly}/yr
                  </span>
                  ${pricingData[1].prices.yearly}/yr
                </p>
                <p className="text-md text-purple-700 font-semibold">
                  Limited Time Offer - Don&apos;t Miss Out!
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  30-day money-back guarantee*
                </p>
              </motion.div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105"
                    onClick={() => {
                      router.push(
                        `/signup?email=${emailAddress}&firstName=${firstName}&lastName=${lastName}&redirect=billing`
                      );
                    }}
                  >
                    Upgrade Now & Boost Your Career{' '}
                    <ArrowRight className="ml-2" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Sign Up to Complete your Upgrade</DialogTitle>
                    <DialogDescription>
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="flex justify-center"
                      >
                        <Loader2 className="h-12 w-12 text-purple-600" />
                      </motion.div>
                      <p className="mt-4 text-gray-600 font-semibold">
                        Preparing your professional journey...
                      </p>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </CardFooter>
            <div className="text-center pb-2">
              <Link
                href={`/signup?email=${emailAddress}&firstName=${firstName}&lastName=${lastName}`}
                className="text-sm text-gray-600 hover:underline"
              >
                I&apos;ll stick with the basic plan for now
              </Link>
              <p className="text-xs text-gray-400 mt-1">
                *The cost of your domain (approx. $10) is non-refundable.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
