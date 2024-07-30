'use client';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { BentoGrid, BentoGridItem } from '../ui/bento-grid';
import {
  IconBoxAlignRightFilled,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from '@tabler/icons-react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle, LockKeyhole, ShieldCheck } from 'lucide-react';
import { LockClosedIcon } from '@radix-ui/react-icons';

export function BentoPrivacy() {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center text-center bg-black my-12 py-12 lg:my-18">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <motion.div
          className="flex flex-col items-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: -50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          <h1 className="font-heading text-3xl md:text-6xl text-white">
            We take your{' '}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
              privacy{' '}
            </span>
            seriously
          </h1>
        </motion.div>
        <motion.div
          className="flex flex-col items-center mt-12"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: -50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          <BentoGrid className="max-w-4xl w-full md:auto-rows-[20rem]">
            {items.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                className={cn('[&>p:text-lg]', item.className)}
                icon={item.icon}
              />
            ))}
          </BentoGrid>
        </motion.div>
      </div>
    </section>
  );
}

const SkeletonOne = () => {
  const variants = {
    initial: { x: 0 },
    animate: {
      x: 10,
      rotate: 5,
      transition: { duration: 0.2 },
    },
  };
  const variantsSecond = {
    initial: { x: 0 },
    animate: {
      x: -10,
      rotate: -5,
      transition: { duration: 0.2 },
    },
  };

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  const [randomString, setRandomString] = useState('');

  useEffect(() => {
    let str = generateRandomString(1500);
    setRandomString(str);
  }, []);

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);

    const str = generateRandomString(1500);
    setRandomString(str);
  }

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-purple-900/20 flex-col space-y-2"
    >
      <div
        onMouseMove={onMouseMove}
        className="group/card relative flex items-center justify-center w-full h-full bg-transparent"
      >
        <CardPattern
          mouseX={mouseX}
          mouseY={mouseY}
          randomString={randomString}
        />
        <div className="relative z-10 flex items-center justify-center">
          <ShieldCheck className="w-24 h-24 text-purple-600 bg-purple-950 rounded-full p-4" />
        </div>
      </div>
    </motion.div>
  );
};

export function CardPattern({ mouseX, mouseY, randomString }: any) {
  let maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 rounded-2xl [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50"></div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 to-purple-600 opacity-100 group-hover/card:opacity-100 backdrop-blur-xl transition duration-500"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-100 mix-blend-overlay group-hover/card:opacity-100"
        style={style}
      >
        <motion.p
          className="absolute inset-x-0 text-xs h-full break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500 group-hover/card:bg-gradient-to-r group-hover/card:from-purple-400 group-hover/card:to-purple-600"
          animate={{
            x: [0, 10, -10, 0], // X-axis movement
            y: [0, 10, -10, 0], // Y-axis movement
          }}
          transition={{
            duration: 4,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        >
          {randomString}
        </motion.p>
      </motion.div>
    </div>
  );
}

const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
export const generateRandomString = (length: number) => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const SkeletonTwo = () => {
  const circleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: [0, 0.5, 0],
      transition: {
        repeat: Infinity,
        duration: 4,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div className="flex flex-1 w-full h-full min-h-[6rem] bg-purple-900/20 items-center justify-center relative overflow-hidden">
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: `${20 + index * 20}%`,
            height: `${20 + index * 20}%`,
            background: 'linear-gradient(to right, #a855f7, #6366f1)',
          }}
          variants={circleVariants}
          initial="initial"
          animate="animate"
          transition={{
            delay: index * 0.8,
          }}
        />
      ))}
      <motion.div
        className="relative z-10 bg-purple-950 p-4 rounded-full"
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <LockKeyhole className="w-14 h-14 text-purple-500" />
      </motion.div>
    </motion.div>
  );
};

const SkeletonThree = () => {
  const variants = {
    initial: { backgroundPosition: '0 50%' },
    animate: {
      backgroundPosition: ['0, 50%', '100% 50%', '0 50%'],
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: 'reverse',
      }}
      className="flex flex-1 w-full h-full min-h-[6rem] bg-purple-900/20 rounded-lg flex-col space-y-2"
      style={{
        background:
          'linear-gradient(-45deg, #4c1d95, #7e22ce, #a855f7, #d8b4fe)',
        backgroundSize: '400% 400%',
      }}
    >
      <motion.div className="h-full w-full rounded-lg"></motion.div>
    </motion.div>
  );
};

const SkeletonFour = () => {
  const first = {
    initial: { x: 20, rotate: -5 },
    hover: { x: 0, rotate: 0 },
  };
  const second = {
    initial: { x: -20, rotate: 5 },
    hover: { x: 0, rotate: 0 },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-purple-900/20 flex-row space-x-2"
    >
      <motion.div
        variants={first}
        className="h-full w-1/3 rounded-2xl bg-purple-950 p-4 border border-purple-500/50 flex flex-col items-center justify-center"
      >
        <div className="rounded-full h-10 w-10 bg-purple-700" />
        <p className="sm:text-sm text-xs text-center font-semibold text-purple-300 mt-4">
          End-to-end encryption
        </p>
        <p className="border border-purple-500 bg-purple-900/20 text-purple-300 text-xs rounded-full px-2 py-0.5 mt-4">
          GDPR
        </p>
      </motion.div>
      <motion.div className="h-full relative z-20 w-1/3 rounded-2xl bg-purple-950 p-4 border border-purple-500/50 flex flex-col items-center justify-center">
        <div className="rounded-full h-10 w-10 bg-purple-700" />
        <p className="sm:text-sm text-xs text-center font-semibold text-purple-300 mt-4">
          Data anonymization
        </p>
        <p className="border border-purple-500 bg-purple-900/20 text-purple-300 text-xs rounded-full px-2 py-0.5 mt-4">
          Secure
        </p>
      </motion.div>
      <motion.div
        variants={second}
        className="h-full w-1/3 rounded-2xl bg-purple-950 p-4 border border-purple-500/50 flex flex-col items-center justify-center"
      >
        <div className="rounded-full h-10 w-10 bg-purple-700" />
        <p className="sm:text-sm text-xs text-center font-semibold text-purple-300 mt-4">
          Limited data retention
        </p>
        <p className="border border-purple-500 bg-purple-900/20 text-purple-300 text-xs rounded-full px-2 py-0.5 mt-4">
          Protected
        </p>
      </motion.div>
    </motion.div>
  );
};

const SkeletonFive = () => {
  const variants = {
    initial: { x: 0 },
    animate: {
      x: 10,
      rotate: 5,
      transition: { duration: 0.2 },
    },
  };
  const variantsSecond = {
    initial: { x: 0 },
    animate: {
      x: -10,
      rotate: -5,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-purple-900/20 flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-2xl border border-purple-500/50 p-2 items-start space-x-2 bg-purple-950"
      >
        <div className="rounded-full h-10 w-10 bg-purple-700" />
        <p className="text-xs text-purple-300">
          Your data is protected with state-of-the-art encryption...
        </p>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-purple-500/50 p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-purple-950"
      >
        <p className="text-xs text-purple-300">Privacy first.</p>
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex-shrink-0" />
      </motion.div>
    </motion.div>
  );
};

const items = [
  {
    title: "We don't sell your data",
    description: (
      <span className="text-sm">
        We don&apos;t sell your data to third parties.
      </span>
    ),
    header: <SkeletonOne />,
    className: 'md:col-span-1',
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: 'Secure Storage',
    description: (
      <span className="text-sm">
        Your data is stored securely in highly encrypted databases.
      </span>
    ),
    header: <SkeletonTwo />,
    className: 'md:col-span-1',
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: 'Private AI Suggestions',
    description: (
      <span className="text-sm">
        Receive AI-powered suggestions while keeping your data private.
      </span>
    ),
    header: <SkeletonThree />,
    className: 'md:col-span-1',
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: 'GDPR Compliant',
    description: (
      <span className="text-sm">
        We are fully compliant with the General Data Protection Regulation.
      </span>
    ),
    header: <SkeletonFour />,
    className: 'md:col-span-2',
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: 'You are in control',
    description: (
      <span className="text-sm">
        We will never use your data to train our AI models without your consent.
      </span>
    ),
    header: <SkeletonFive />,
    className: 'md:col-span-1',
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];
