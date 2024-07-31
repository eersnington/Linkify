'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Logo from '@/components/shared/logo';

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export default function notFound() {
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

      {/* 404 Message */}
      <motion.div
        className="mb-8"
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h1 className="text-6xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
          404
        </h1>
        <p className="text-2xl text-gray-700 dark:text-gray-300">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
      </motion.div>

      {/* Back to Home Button */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Link href="/">
          <a className="px-6 py-3 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 transition duration-300">
            Go Back Home
          </a>
        </Link>
      </motion.div>
    </div>
  );
}
