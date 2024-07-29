'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { LayoutTemplate, Sparkles } from 'lucide-react';
import { LinkedInLogoIcon } from '@radix-ui/react-icons';
import { CTAForm } from '../forms/cta-email-form';

const wordVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const iconVariants = {
  hidden: { opacity: 0, rotate: -15 },
  visible: { opacity: 1, rotate: 0 },
};

const secondLineVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};

const thirdLineVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0 },
};

const formVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0 },
};

export function HeroLanding() {
  const images = [
    '/images/templates/Basic.png',
    '/images/templates/Creative.png',
    '/images/templates/Modern.png',
    '/images/templates/Minimalist.png',
    '/images/templates/Professional.png',
  ];

  return (
    <section className="container">
      <div className="flex flex-col items-center text-center justify-center gap-y-8 mt-8">
        <HeroTextFormComponent />
      </div>
      <div className="flex flex-row items-center justify-between gap-y-8 mt-4">
        <SampleLinkedInProfile />
        <Arrow />
        <CustomCarousel images={images} />
      </div>
    </section>
  );
}

const HeroTextFormComponent = () => {
  const firstLineWords = ['Create', 'a', 'stunning', 'personal'];

  return (
    <>
      <div className="space-y-4">
        <div className="text-balance font-extrabold text-purple-950 text-3xl sm:text-5xl md:text-7xl">
          {firstLineWords.map((word, index) => (
            <motion.span
              key={index}
              className="inline-block mr-2"
              initial="hidden"
              animate="visible"
              variants={wordVariants}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {word}
              {index === 2 && (
                <motion.span
                  className="inline-block text-purple-500 mx-2"
                  variants={iconVariants}
                  transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                >
                  <Sparkles className="inline-block size-10 md:size-12 lg:size-14" />
                </motion.span>
              )}
            </motion.span>
          ))}
        </div>
        <motion.div
          className="text-balance font-extrabold text-purple-950 text-2xl sm:text-4xl md:text-6xl"
          initial="hidden"
          animate="visible"
          variants={secondLineVariants}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          website{' '}
          <motion.span
            className="inline-block text-purple-500"
            variants={iconVariants}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <LayoutTemplate className="inline-block size-10 md:size-12 lg:size-14" />
          </motion.span>{' '}
          from your
        </motion.div>
        <motion.div
          className="text-balance font-extrabold text-purple-950 text-2xl sm:text-4xl md:text-6xl"
          initial="hidden"
          animate="visible"
          variants={thirdLineVariants}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          LinkedIn{' '}
          <motion.span
            className="inline-block text-purple-500"
            variants={iconVariants}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <LinkedInLogoIcon className="inline-block size-10 md:size-12 lg:size-14" />
          </motion.span>{' '}
          profile
        </motion.div>
      </div>
      <motion.div
        className="w-full max-w-xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={formVariants}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <CTAForm />
      </motion.div>
    </>
  );
};

const SampleLinkedInProfile = () => {
  return (
    <motion.div
      className="rounded-lg shadow-xl"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1.1 }}
    >
      <Image
        src="/images/linkedin-profile.png"
        alt="LinkedIn Profile"
        width={600}
        height={800}
        className="w-full h-full max-w-1/3 rounded-lg"
      />
    </motion.div>
  );
};

const Arrow = () => {
  return (
    <motion.div
      className="flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.3 }}
    >
      <Image
        src="/images/hand-drawn-arrow.jpg"
        alt="Hand-drawn arrow"
        width={200}
        height={200}
      />
    </motion.div>
  );
};

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const CustomCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <motion.div
      className="relative w-[600px] h-[300px] overflow-hidden rounded-lg shadow-xl"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1.1 }}
    >
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={fadeVariants}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt={`Template preview ${currentIndex + 1}`}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
