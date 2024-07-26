'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ArrowRight, Sparkles, Check, Star } from 'lucide-react';
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

const features = [
  'Your own custom domain (e.g., yourname.com)',
  'Access to premium templates',
  'Website visitor statistics',
  'Priority customer support',
  'AI-powered content generation',
  'And much more',
];

const images = [
  '/images/templates/Basic.png',
  '/images/templates/Creative.png',
  '/images/templates/Modern.png',
  '/images/templates/Minimalist.png',
  '/images/templates/Professional.png',
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
      y: [0, -10, 0],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
    });
  }, [controls]);

  if (!linkedInProfile) {
    router.push('/onboard');
    return <div>Loading...</div>;
  }

  const { firstName, lastName } = linkedInProfile;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 to-gray-900 p-8 flex flex-col items-center justify-center">
      <motion.div
        className="flex justify-center items-center mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {images.map((image, idx) => (
          <motion.div
            key={`image${idx}`}
            style={{
              rotate: Math.random() * 20 - 10,
            }}
            whileHover={{
              scale: 1.1,
              rotate: 0,
              zIndex: 100,
            }}
            whileTap={{
              scale: 1.1,
              rotate: 0,
              zIndex: 100,
            }}
            className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-purple-500 flex-shrink-0 overflow-hidden shadow-lg"
          >
            <Image
              src={image}
              alt={`Template preview ${idx + 1}`}
              width="200"
              height="200"
              className="rounded-lg h-24 w-24 md:h-48 md:w-48 object-cover flex-shrink-0"
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mx-auto w-full max-w-2xl border-2 border-purple-500 drop-shadow-2xl">
          <CardHeader className="text-purple-950">
            <motion.div animate={controls}>
              <CardTitle className="text-3xl font-bold flex items-center justify-center space-x-2">
                <Star className="text-yellow-500" />
                <span className="text-gradient_indigo-purple font-bold">
                  Unleash Your Professional Potential
                </span>
                <Star className="text-yellow-500" />
              </CardTitle>
            </motion.div>
            <p className="text-center text-purple-700 font-semibold">
              Elevate Your Career with Premium Features
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="space-y-3 mb-6">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-center text-gray-700"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Check className="text-yellow-500 mr-2 h-5 w-5" />
                  {feature}
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="text-center mb-6"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="text-3xl font-bold text-purple-700 mb-2">
                <span className="line-through text-gray-400 text-xl mr-2">
                  $59/yr
                </span>
                $39/yr
              </p>
              <p className="text-lg text-purple-600 font-semibold">
                Limited Time Offer - Don&apos;t Miss Out!
              </p>
              <p className="text-sm text-gray-500 mt-2">
                30-day money-back guarantee*
              </p>
            </motion.div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full justify-center">
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-purple-950 font-bold py-3 px-8 rounded-full shadow-lg transform transition duration-300 hover:scale-105">
                    Upgrade Now & Boost Your Career{' '}
                    <ArrowRight className="ml-2" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Complete Your Upgrade</DialogTitle>
                  </DialogHeader>
                  {/* Add your payment form here */}
                </DialogContent>
              </Dialog>
            </div>
          </CardFooter>
          <div className="text-center pb-4">
            <Link
              href={`/signup?email=${emailAddress}&firstName=${firstName}&lastName=${lastName}`}
              className="text-sm text-purple-600 hover:underline"
            >
              I&apos;ll stick with the basic plan for now
            </Link>
            <p className="text-xs text-gray-400 mt-2">
              *The cost of your domain (approx. $10) is non-refundable.
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
