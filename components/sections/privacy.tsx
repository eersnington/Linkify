'use client';
import { cn } from '@/lib/utils';
import React from 'react';
import { BentoGrid, BentoGridItem } from '../ui/bento-grid';
import { IconShieldCheck, IconLock, IconUser } from '@tabler/icons-react';
import { motion } from 'framer-motion';

export function PrivacySection() {
  const privacyItems = [
    {
      title: 'Your Data is Safe',
      description: (
        <span className="text-sm">
          We prioritize your privacy and ensure that your data is never stored
          or sold.
        </span>
      ),
      header: <DataSecurity />,
      className: 'md:col-span-1',
      icon: <IconShieldCheck className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: 'No Data Storage',
      description: (
        <span className="text-sm">
          We don’t keep your LinkedIn data after conversion. Your information is
          yours alone.
        </span>
      ),
      header: <NoStorage />,
      className: 'md:col-span-1',
      icon: <IconLock className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: 'Privacy First',
      description: (
        <span className="text-sm">
          Your private information is never shared with third parties.
        </span>
      ),
      header: <PrivacyFirst />,
      className: 'md:col-span-1',
      icon: <IconUser className="h-4 w-4 text-neutral-500" />,
    },
  ];

  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
      {privacyItems.map((item, i) => (
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
  );
}

const DataSecurity = () => {
  return (
    <motion.div className="flex flex-1 w-full h-full min-h-[6rem] bg-dot-black/[0.2] flex-col space-y-2">
      <div className="flex flex-row rounded-full border border-neutral-100 p-2 items-center space-x-2 bg-white">
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-full" />
      </div>
      <div className="flex flex-row rounded-full border border-neutral-100 p-2 items-center space-x-2 bg-white">
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-full" />
      </div>
    </motion.div>
  );
};

const NoStorage = () => {
  return (
    <motion.div className="flex flex-1 w-full h-full min-h-[6rem] bg-dot-black/[0.2] flex-col space-y-2">
      <div className="flex flex-row rounded-full border border-neutral-100 p-2 items-center space-x-2 bg-white">
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-full" />
      </div>
      <div className="flex flex-row rounded-full border border-neutral-100 p-2 items-center space-x-2 bg-white">
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-full" />
      </div>
    </motion.div>
  );
};

const PrivacyFirst = () => {
  return (
    <motion.div className="flex flex-1 w-full h-full min-h-[6rem] bg-dot-black/[0.2] flex-col space-y-2">
      <div className="flex flex-row rounded-full border border-neutral-100 p-2 items-center space-x-2 bg-white">
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-full" />
      </div>
      <div className="flex flex-row rounded-full border border-neutral-100 p-2 items-center space-x-2 bg-white">
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-full" />
      </div>
    </motion.div>
  );
};
