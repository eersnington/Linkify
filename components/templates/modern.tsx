'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Briefcase, GraduationCap, ExternalLink } from 'lucide-react';

import { LinkedInProfile as TemplateProps } from '@prisma/client';
import { cn } from '@/lib/utils';
import { dm_display, pf_display } from '@/app/fonts';
import Link from 'next/link';

export function ModernTemplate({ profile }: { profile: TemplateProps }) {
  const {
    firstName,
    lastName,
    title,
    description,
    photoUrl,
    workExperiences,
    education,
    skills,
    userEmail,
  } = profile;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center lg:flex-row lg:justify-between"
          >
            <div className="mb-8 lg:mb-0 lg:mr-8 text-center lg:text-left">
              <h1
                className={cn(
                  'mb-4 bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-6xl sm:text-7xl lg:text-8xl font-bold text-transparent',
                  dm_display.className
                )}
              >
                {firstName + ' ' + lastName}
              </h1>
              <p
                className={cn(
                  'text-3xl sm:text-4xl text-teal-300',
                  pf_display.className
                )}
              >
                {title}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 inline-flex items-center px-6 py-3 bg-teal-500 text-gray-900 rounded-full text-lg font-semibold transition-colors hover:bg-teal-400"
                onClick={() => (window.location.href = `mailto:${userEmail}`)}
              >
                <Mail className="mr-2 h-5 w-5" /> Contact Me
              </motion.button>
            </div>
            <Image
              src={photoUrl}
              alt={firstName + ' ' + lastName}
              width={200}
              height={200}
              className="size-48 sm:size-64 rounded-full border-4 border-teal-500 shadow-lg shadow-purple-500/50"
            />
          </motion.div>
        </header>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-20"
        >
          <p className="max-w-2xl mx-auto text-xl text-gray-300">
            {description}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {skills.slice(0, 5).map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-800 text-teal-300 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="mb-8 text-3xl font-bold text-teal-300 flex items-center">
            <Briefcase className="mr-3 h-8 w-8" /> Experience
          </h2>
          {workExperiences.map((job: any, index: number) => (
            <motion.div
              key={job.company}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="mb-8 border-l-2 border-purple-500 pl-6"
            >
              <h3 className="text-2xl font-bold text-teal-100">{job.title}</h3>
              <p className="text-xl text-purple-300">{job.company}</p>
              <p className="text-gray-400">{job.date}</p>
              <p className="mt-2 text-gray-300">{job.description}</p>
            </motion.div>
          ))}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="mb-8 text-3xl font-bold text-teal-300 flex items-center">
            <GraduationCap className="mr-3 h-8 w-8" /> Education
          </h2>
          {education.map((school: any, index: number) => (
            <motion.div
              key={school.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="mb-8 border-l-2 border-purple-500 pl-6"
            >
              <h3 className="text-2xl font-bold text-teal-100">
                {school.name}
              </h3>
              <p className="text-xl text-purple-300">{school.degree}</p>
              <p className="text-gray-400">{school.date}</p>
            </motion.div>
          ))}
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center"
        >
          <Link
            href={`mailto:${userEmail}`}
            className="group inline-flex items-center text-lg font-semibold text-teal-400 transition-colors hover:text-teal-300"
          >
            Get in touch
            <ExternalLink className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
