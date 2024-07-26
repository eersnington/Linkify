'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLinkedInData } from '@/context/linkedin-data-context';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const features = [
  'Custom domain',
  'Premium templates',
  'Visitor statistics',
  'Priority support',
  'AI content generation',
  'And more',
];

export default function UpgradeCards({
  emailAddress,
}: {
  emailAddress: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { linkedInProfile } = useLinkedInData();

  if (!linkedInProfile) {
    router.push('/onboard');
    return <div>Loading...</div>;
  }

  const { firstName, lastName } = linkedInProfile;

  return (
    <div className="min-h-screen w-full flex">
      {/* Left side - White background with character */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-1/2 bg-white flex items-center justify-center p-8"
      >
        <Image
          src="/images/web-design.svg"
          alt="Character holding a website"
          width={400}
          height={400}
        />
      </motion.div>

      {/* Right side - Purple background with upgrade card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-1/2 bg-purple-600 p-8 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-md w-full"
        >
          <Card className="bg-white shadow-2xl rounded-lg overflow-hidden">
            <CardHeader className="bg-purple-700 text-white text-center py-6">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <CardTitle className="text-3xl font-bold mb-2 flex items-center justify-center">
                  Go Pro <Sparkles className="ml-2 text-yellow-300" />
                </CardTitle>
                <p className="text-purple-200">Upgrade to Premium</p>
              </motion.div>
            </CardHeader>
            <CardContent className="p-6">
              <motion.ul
                className="space-y-3 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, staggerChildren: 0.1 }}
              >
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center text-gray-700"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                  >
                    <Star className="text-yellow-400 mr-2 h-5 w-5" />
                    {feature}
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div
                className="text-center mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <p className="text-3xl font-bold text-purple-700 mb-1">
                  $39<span className="text-lg font-normal">/year</span>
                </p>
                <p className="text-sm text-gray-500">
                  30-day money-back guarantee*
                </p>
              </motion.div>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-purple-700 font-semibold shadow-md"
                    size="lg"
                  >
                    Upgrade Now <ArrowRight className="ml-2" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Payment Details</DialogTitle>
                    <DialogDescription>
                      Enter your payment information to upgrade.
                    </DialogDescription>
                  </DialogHeader>
                  {/* Add your payment form here */}
                </DialogContent>
              </Dialog>
              <Link
                href={`/signup?email=${emailAddress}&firstName=${firstName}&lastName=${lastName}`}
                className="block w-full text-center text-sm text-gray-500 mt-4 hover:underline"
              >
                Maybe later
              </Link>
              <p className="text-xs text-gray-400 mt-6 text-center">
                *Domain cost (approx. $10) is non-refundable.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
