'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Logo from '@/components/shared/logo';
import { Button } from '@/components/ui/button';

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-center p-4 sm:p-8">
      {/* Logo */}
      <motion.div
        className="mb-8"
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5 }}
      >
        <Logo />
      </motion.div>

      {/* Error Message */}
      <motion.div
        className="mb-8"
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h1 className="text-6xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
          Error
        </h1>
        <p className="text-2xl text-gray-700 dark:text-gray-300">
          Oops! Something went wrong.
        </p>
      </motion.div>

      {/* Try Again Button */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Button
          onClick={() => reset()}
          className="px-6 py-3 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Try Again
        </Button>
      </motion.div>
    </div>
  );
}
