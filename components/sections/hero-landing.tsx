'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { LinkedInLogoIcon } from '@radix-ui/react-icons';
import { CTAForm } from '../forms/cta-email-form';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';

export function HeroLanding() {
  const images = [
    '/images/carousel/hero/image_one.png',
    '/images/carousel/hero/image_two.png',
    '/images/carousel/hero/image_three.png',
    '/images/carousel/hero/image_four.png',
  ];

  return (
    <section className="container">
      <div className="flex flex-col items-center text-center justify-center gap-y-8 mt-8">
        <HeroTextFormComponent />
      </div>
      <div className="mt-8 mb-8">
        {/* For medium and larger screens */}
        <div className="hidden lg:flex lg:flex-row items-center justify-between gap-8">
          <SampleLinkedInProfile />
          <Arrow />
          <CustomCarousel images={images} />
        </div>
        {/* For smaller screens */}
        <div className="lg:hidden">
          <ComparisonSlider
            linkedInImage="/images/linkedin-profile.png"
            improvedImage={images[0]}
          />
        </div>
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
    <div className="relative w-[50%] aspect-[1768/1748] rounded-lg overflow-hidden shadow-xl">
      <Image
        src="/images/linkedin-profile.png"
        alt="LinkedIn Profile"
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />
    </div>
  );
};

const Arrow = () => {
  return (
    <div className="flex items-center justify-center w-[10%]">
      <Image
        src="/images/hand-drawn-arrow.jpg"
        alt="Hand-drawn arrow"
        width={100}
        height={100}
        className="w-auto h-auto"
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
    <div className="relative w-[50%] aspect-[1768/1748] overflow-hidden rounded-lg shadow-xl">
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

const ComparisonSlider = ({ linkedInImage, improvedImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e) => {
    if (isDragging) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      setSliderPosition((x / rect.width) * 100);
    }
  };

  const handleTouchMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(
      0,
      Math.min(e.touches[0].clientX - rect.left, rect.width)
    );
    setSliderPosition((x / rect.width) * 100);
  };

  return (
    <div
      className="relative w-full aspect-[1768/1748] overflow-hidden rounded-lg shadow-xl cursor-ew-resize select-none"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      <Image
        src={linkedInImage}
        alt="LinkedIn Profile"
        layout="fill"
        objectFit="cover"
        className="rounded-lg pointer-events-none"
        draggable="false"
      />
      <div
        className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={improvedImage}
          alt="Improved Profile"
          layout="fill"
          objectFit="cover"
          className="rounded-lg pointer-events-none"
          draggable="false"
        />
      </div>
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
        style={{ left: `calc(${sliderPosition}% - 0.5px)` }}
      />
      <div
        className="absolute top-1/2 transform -translate-y-1/2 flex flex-col items-center"
        style={{ left: `calc(${sliderPosition}% - 75px)` }}
      >
        <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm mb-2 whitespace-nowrap">
          Slide to see the difference
        </div>
      </div>
    </div>
  );
};
