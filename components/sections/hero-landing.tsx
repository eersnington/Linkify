'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { LinkedInLogoIcon } from '@radix-ui/react-icons';
import { CTAForm } from '../forms/cta-email-form';
import { Badge } from '../ui/badge';

export function HeroLanding() {
  const images = [
    '/images/carousel/hero/image1.png',
    '/images/carousel/hero/image2.png',
    '/images/carousel/hero/image3.png',
    '/images/carousel/hero/image4.png',
  ];

  return (
    <section className="container">
      <div className="flex flex-col items-center text-center justify-center gap-y-8 mt-8">
        {/* <Badge className="border-purple-500 text-purple-500 hover:text-purple-500 bg-white hover:bg-white">
          <LinkedInLogoIcon className="w-6 h-6 mr-2" />
          Over 500 LinkedIn Users Served
        </Badge> */}
        <HeroTextFormComponent />
      </div>
      <div className="flex flex-row items-center justify-between gap-y-8 mt-8 mb-8">
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
        <p className="text-purple-800 tracking-tight font-medium text-lg sm:text-xl md:text-2xl">
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
    <div className="rounded-lg overflow-hidden w-[600px] shadow-xl">
      <Image
        src="/images/linkedin-profile.png"
        alt="LinkedIn Profile"
        width={600}
        height={800}
        className="object-cover"
      />
    </div>
  );
};

const Arrow = () => {
  return (
    <div className="flex items-center justify-center">
      <Image
        src="/images/hand-drawn-arrow.jpg"
        alt="Hand-drawn arrow"
        width={200}
        height={200}
      />
    </div>
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
    <div className="relative w-[600px] h-[800px] overflow-hidden rounded-lg shadow-xl">
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
    </div>
  );
};
