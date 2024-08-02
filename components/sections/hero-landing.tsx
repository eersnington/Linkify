'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { LayoutTemplate, Sparkles } from 'lucide-react';
import { LinkedInLogoIcon } from '@radix-ui/react-icons';
import { CTAForm } from '../forms/cta-email-form';
import { Button } from '../ui/button';

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
        <Button
          variant={'outline'}
          rounded={'full'}
          className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
        >
          <LinkedInLogoIcon className="w-6 h-6 mr-2" />
          Over 500 LinkedIn Users Served
        </Button>
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
  return (
    <>
      <div className="space-y-4">
        <h1 className="font-bold tracking-tighter text-purple-950 text-4xl sm:text-5xl md:text-6xl leading-tight">
          Create a professional
          <br />
          personal website instantly
          <br />
          from your LinkedIn or
          <br />
          CV/Resume
        </h1>
        <p className="text-purple-500 tracking-tight font-medium text-xl sm:text-2xl md:text-3xl sans-serif">
          Boost your career by presenting yourself like a true professional.
          <br />
          It&apos;s free and takes seconds with our powerful AI.
        </p>
      </div>
      <div className="w-full max-w-xl mx-auto my-4">
        <CTAForm />
      </div>
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
