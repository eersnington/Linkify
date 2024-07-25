"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CTAForm } from "../forms/cta-email-form";
import { LayoutTemplate, Sparkles } from "lucide-react";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import Image from "next/image";

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
  const firstLineWords = ["Create", "a", "stunning", "personal"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "/images/templates/Basic.png",
    "/images/templates/Creative.png",
    "/images/templates/Modern.png",
    "/images/templates/Minimalist.png",
    "/images/templates/Professional.png",
    // Add more image paths as needed
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 500); // 500ms delay for exit animation
    }, 3500); // Total time for each image (3000ms display + 500ms transition)
  
    return () => clearInterval(interval);
  }, [images.length]);
  

  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="container flex max-w-6xl flex-col items-center gap-8 py-16 text-center sm:py-20">
        <div className="text-balance font-extrabold text-purple-950  sm:text-4xl md:text-7xl text-4xl">
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
                  <Sparkles className="inline-block size-14" />
                </motion.span>
              )}
            </motion.span>
          ))}
        </div>
        <motion.div
          className="text-balance font-extrabold text-purple-950 sm:text-4xl md:text-7xl text-2xl"
          initial="hidden"
          animate="visible"
          variants={secondLineVariants}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          website{" "}
          <motion.span
            className="inline-block text-purple-500"
            variants={iconVariants}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <LayoutTemplate className="inline-block size-14" />
          </motion.span>{" "}
          from your
        </motion.div>
        <motion.div
          className="text-balance font-extrabold text-purple-950  sm:text-4xl md:text-7xl text-2xl"
          initial="hidden"
          animate="visible"
          variants={thirdLineVariants}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          LinkedIn{" "}
          <motion.span
            className="inline-block text-purple-500"
            variants={iconVariants}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <LinkedInLogoIcon className="inline-block size-14" />
          </motion.span>{" "}
          profile
        </motion.div>
        <motion.div
          className="flex w-full flex-col items-center justify-center sm:w-9/1 "
          initial="hidden"
          animate="visible"
          variants={formVariants}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <div className="flex w-full justify-center">
            <CTAForm />
          </div>
        </motion.div>

        <motion.div
          className="mt-8 w-full max-w-2xl overflow-hidden rounded-lg shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={images[currentImageIndex]}
              alt="Template preview"
              width={600}
              height={300}
              className="w-full rounded-lg"
            />
          </motion.div>
        </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}