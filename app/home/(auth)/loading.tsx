'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Logo from '@/components/shared/logo';
import { Label } from '@/components/ui/label';

export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <Label className="text-purple-950 text-2xl font-semibold mb-4 flex items-center justify-center">
          <Logo className="h-6 w-auto mr-2" />
          Resumade
        </Label>
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
      </motion.div>
    </div>
  );
}
