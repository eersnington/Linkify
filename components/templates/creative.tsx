'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Briefcase,
  ChevronDown,
  GraduationCap,
  Handshake,
  Star,
} from 'lucide-react';

import { LinkedInProfile as TemplateProps } from '@/types/linkedin';
import { cn } from '@/lib/utils';
import { dm_display, pf_display } from '@/app/fonts';

import { Badge } from '../ui/badge';

export function CreativeTemplate({ profile }: { profile: TemplateProps }) {
  const {
    firstName,
    lastName,
    title,
    description,
    photoUrl,
    workExperiences,
    education,
  } = profile;
  return (
    <div className="min-h-screen bg-[#f5e6d3] p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-6xl"
      >
        <section className="mb-16 overflow-hidden rounded-3xl bg-[#e6d2b8] shadow-2xl">
          <div className="flex flex-col md:flex-row">
            <motion.div
              className="flex flex-col justify-center p-8 md:w-1/2"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Badge className="mb-4 w-fit rounded-full bg-[#d4bc94] px-4 py-2 font-mono text-lg font-semibold text-[#5c4d3c] hover:bg-[#bc9f6c]">
                {'👋 '} Hello world
              </Badge>
              <div
                className={cn(
                  'mb-2 text-6xl font-bold text-[#5c4d3c]',
                  dm_display.className
                )}
              >
                {firstName + ' ' + lastName}
              </div>
              <div
                className={cn(
                  'mb-4 text-3xl font-medium text-[#7d6852]',
                  pf_display.className
                )}
              >
                {title}
              </div>
              <div className="text-xl text-[#8c7a62]">{description}</div>
            </motion.div>
            <motion.div
              className="relative md:w-1/2"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="absolute inset-0 origin-top-right skew-x-6 bg-[#d4bc94]"></div>
              <Image
                src={photoUrl}
                alt={firstName + ' ' + lastName}
                width={600}
                height={600}
                className="relative z-10 size-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="mb-6 flex items-center text-3xl font-bold text-[#5c4d3c]">
            <Briefcase className="mr-2" /> Work Experience
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {workExperiences.map((job: any, index: number) => (
              <motion.div
                key={job.company}
                className="rounded-xl bg-[#f0e2cc] p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="mb-2 text-2xl font-bold text-[#5c4d3c]">
                  {job.title}
                </div>
                <div className="mb-1 text-lg font-semibold text-[#7d6852]">
                  {job.company}
                </div>
                <div className="mb-2 text-sm font-medium text-[#8c7a62]">
                  {job.date}
                </div>
                <div className="text-[#5c4d3c]">{job.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="mb-6 flex items-center text-3xl font-bold text-[#5c4d3c]">
            <GraduationCap className="mr-2" /> Education
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {education.map((school: any, index: number) => (
              <motion.div
                key={school.name}
                className="rounded-xl bg-[#f0e2cc] p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="mb-2 text-2xl font-bold text-[#5c4d3c]">
                  {school.name}
                </div>
                <div className="mb-1 text-lg font-semibold text-[#7d6852]">
                  {school.degree}
                </div>
                <div className="text-sm font-medium text-[#8c7a62]">
                  {school.date}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <ChevronDown
            className="mx-auto animate-bounce text-[#5c4d3c]"
            size={32}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
