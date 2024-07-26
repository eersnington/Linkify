'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Briefcase, ChevronDown, GraduationCap } from 'lucide-react';

import { LinkedInProfile as TemplateProps } from '@/types/linkedin';

export function BasicTemplate({ profile }: { profile: TemplateProps }) {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col rounded-lg border border-gray-200 bg-white p-8 shadow-md"
    >
      <div className="mx-auto max-w-4xl">
        <motion.header
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Image
            src={photoUrl}
            alt={firstName + ' ' + lastName}
            width={200}
            height={200}
            className="mx-auto mb-4 rounded-full shadow-lg"
          />
          <div className="mb-2 text-4xl font-bold text-gray-800">
            {firstName + ' ' + lastName}
          </div>
          <div className="mb-2 text-xl font-semibold text-gray-600">
            {title}
          </div>
          <span className="text-xl text-gray-600">{description}</span>
        </motion.header>

        <motion.section
          className="mb-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="mb-6 flex items-center text-2xl font-semibold text-gray-800">
            <Briefcase className="mr-2" /> Work Experience
          </h2>
          {workExperiences.map((job: any, index: number) => (
            <motion.div
              key={job.company}
              className="mb-6 rounded-lg bg-gray-50 p-6 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <h3 className="mb-2 text-xl font-semibold text-gray-800">
                {job.title}
              </h3>
              <span className="mb-1 text-gray-600">{job.company}</span>
              <div className="mb-2 text-sm text-gray-500">{job.date}</div>
              <span className="text-gray-700">{job.description}</span>
            </motion.div>
          ))}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="mb-6 flex items-center text-2xl font-semibold text-gray-800">
            <GraduationCap className="mr-2" /> Education
          </h2>
          {education.map((school: any, index: number) => (
            <motion.div
              key={school.name}
              className="mb-6 rounded-lg bg-gray-50 p-6 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <h3 className="mb-2 text-xl font-semibold text-gray-800">
                {school.name}
              </h3>
              <span className="mb-1 text-gray-600">{school.degree}</span>
              <div className="text-sm text-gray-500">{school.date}</div>
            </motion.div>
          ))}
        </motion.section>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <ChevronDown
            className="mx-auto animate-bounce text-gray-400"
            size={32}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
