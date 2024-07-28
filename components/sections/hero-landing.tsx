'use client';

import { motion } from 'framer-motion';
import { CTAForm } from '../forms/cta-email-form';
import { LayoutTemplate, Sparkles } from 'lucide-react';
import { LinkedInLogoIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"


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
  const firstLineWords = ['Create', 'a', 'stunning', 'personal'];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    '/images/templates/Basic.png',
    '/images/templates/Creative.png',
    '/images/templates/Modern.png',
    '/images/templates/Minimalist.png',
    '/images/templates/Professional.png',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="h-screen flex items-center justify-center px-4 sm:px-8 overflow-hidden">
      <div className="container max-w-7xl grid grid-rows-[auto_auto_1fr] gap-6 py-8 text-center sm:py-12">
        {/* Text content */}
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

        {/* Form */}
        <motion.div
          className="w-full max-w-xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={formVariants}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <CTAForm />
        </motion.div>

        {/* Images Layout */}
        <div className="flex justify-between items-center w-full max-w-7xl mx-auto self-end space-x-4">
          {/* LinkedIn Profile Image */}
          <motion.div
            className="w-2/5 rounded-lg shadow-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            <Image
              src="/images/linkedin-profile.png"
              alt="LinkedIn Profile"
              width={800}
              height={600}
              className="w-full h-auto rounded-lg"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </motion.div>

          {/* Arrow in the middle */}
          <motion.div
            className="w-1/5 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            <Image
              src="/images/hand-drawn-arrow.jpg"
              alt="Hand-drawn arrow"
              width={200}
              height={200}
              className="w-3/4 h-auto"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </motion.div>

          {/* Template Slideshow */}
          <motion.div
            className="w-2/5 rounded-lg shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
            >
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <Image
                      src={image}
                      alt={`Template preview ${index + 1}`}
                      width={800}
                      height={600}
                      className="rounded-lg"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
