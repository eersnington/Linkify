'use client';

import { useState, useEffect, useTransition } from 'react';
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
import { generateStripeCheckoutForUnsignedUser } from '@/actions/onboard-checkout';

const features = [
  'Your own custom domain (e.g., yourname.com)',
  'Access to premium templates',
  'Website visitor statistics',
  'Priority customer support',
  'AI-powered content generation',
  'And much more',
];

export default function OnboardUpgrade({
  emailAddress,
}: {
  emailAddress: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [upgrading, setUpgrading] = useState(false);
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

  const handleUpgradeClick = async () => {
    setUpgrading(true);
    const priceId = pricingData[1].stripeIds.yearly;
    const couponId = pricingData[1].stripeIds.coupon;

    if (!priceId) {
      throw new Error('Price ID is required');
    }

    try {
      const result = await generateStripeCheckoutForUnsignedUser(
        emailAddress,
        firstName,
        lastName,
        priceId,
        couponId
      );
      if (result.status === 'success' && result.stripeUrl) {
        window.location.href = result.stripeUrl;
      } else {
        console.error('Failed to create Stripe checkout session');
        setIsOpen(true);
      }
    } catch (error) {
      console.error('Error during upgrade process:', error);
      setIsOpen(true);
    } finally {
      setUpgrading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-8 flex items-center justify-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="flex-col space-y-6">
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
              className="mx-auto hidden lg:flex"
            />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <Card className="border-2 border-purple-500">
            <CardHeader className="text-purple-950 text-center pb-6">
              <motion.div animate={controls}>
                <CardTitle className="text-2xl md:text-3xl font-bold flex items-center justify-center space-x-2 mb-4">
                  <Star className="text-yellow-500 h-8 w-8" />
                  <span>Unleash Your Professional Potential</span>
                  <Star className="text-yellow-500 h-8 w-8" />
                </CardTitle>
              </motion.div>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Elevate Your Career with Premium Features.
                <br />
                <span className="font-semibold">
                  Create your free website on yourname.example.com, or
                  <br />
                  upgrade to represent yourself as a true professional:
                </span>
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-3 mb-6">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center text-gray-700 text-base md:text-lg"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Check className="text-emerald-500 mr-3 h-6 w-6 flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                className="text-center mb-6"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p className="text-3xl font-bold text-emerald-500 mb-3">
                  <span className="line-through text-gray-400 text-lg md:text-xl mr-3">
                    ${pricingData[1].prices.monthly}/yr
                  </span>
                  ${pricingData[1].prices.yearly}/yr
                </p>
                <p className="text-base md:text-lg text-purple-700 font-semibold mb-2">
                  This exclusive discount is only available now!
                </p>
                <p className="text-sm text-green-700">
                  30-day money-back guarantee*
                </p>
              </motion.div>
            </CardContent>
            <CardFooter className="flex justify-center pb-6">
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transform transition duration-300 hover:scale-105 text-sm md:text-lg"
                    onClick={handleUpgradeClick}
                    disabled={upgrading}
                  >
                    {upgrading ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        Upgrade Now & Boost Your Career{' '}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold mb-4">
                      Creating a Session for your Upgrade
                    </DialogTitle>
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
                        className="flex justify-center mb-4"
                      >
                        <Loader2 className="h-16 w-16 text-purple-600" />
                      </motion.div>
                      <p className="text-lg text-gray-600 font-semibold">
                        Preparing your professional journey...
                      </p>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </CardFooter>
            <div className="text-center pb-4">
              <p className="text-xs text-gray-400">
                *The cost of your domain (approx. $10) is non-refundable.
              </p>
            </div>
          </Card>
          <div className="text-center py-4">
            <Link
              href={`/signup?email=${emailAddress}&firstName=${firstName}&lastName=${lastName}`}
              className="text-sm text-gray-600 hover:underline"
            >
              I&apos;ll stick with the basic plan for now
            </Link>
          </div>
        </motion.div>
        <div className="flex lg:hidden flex-col space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/images/web-designer.svg"
              alt="Web Designer"
              width="500"
              height="500"
              className="mx-auto"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
