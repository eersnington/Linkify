'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Mail,
  Calendar,
  Building,
  ChevronDown,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { anton } from '@/app/fonts';

import { LinkedInProfile as TemplateProps } from '@prisma/client';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

export function SnappyTemplate({ profile }: { profile: TemplateProps }) {
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

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <div className="bg-lime-900 text-lime-200 min-h-screen">
      {/* Hero Section */}
      <section
        ref={ref}
        className="h-screen flex justify-center items-center px-4 py-4 text-center overflow-hidden"
      >
        <div className="bg-lime-300 rounded-3xl p-8 shadow-xl max-w-full max-h-full w-full h-full flex items-center justify-center relative overflow-hidden">
          {/* Background Text Effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <div
                className={cn(
                  'text-lime-100 opacity-40 text-[6vw] leading-none',
                  anton.className,
                  'background-text'
                )}
              >
                {Array(10)
                  .fill(`${firstName.toUpperCase()} ${lastName.toUpperCase()} `)
                  .join('')}
              </div>
            </div>
          </div>

          {/* Foreground Content */}
          <motion.div
            style={{ y }}
            className="space-y-8 flex flex-col items-center relative z-10"
          >
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={cn('text-8xl mb-4 text-lime-900', anton.className)}
              style={{ fontSize: 'calc(1.5rem + 5vw)' }}
            >
              {(firstName + ' ' + lastName).toUpperCase()}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={cn('text-5xl mb-8 text-lime-700', anton.className)}
              style={{ fontSize: 'calc(1rem + 2vw)' }}
            >
              {title.toLowerCase()}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mx-auto"
            >
              <Image
                src={photoUrl}
                alt={firstName + ' ' + lastName}
                width={200}
                height={300}
                className="rounded-full border-4 border-lime-600 object-cover"
                style={{ width: '200px', height: '300px' }}
              />
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="absolute bottom-8"
        >
          <ChevronDown className="w-12 h-12 text-lime-400 animate-bounce" />
        </motion.div>
      </section>

      <style jsx>{`
        .background-text::before,
        .background-text::after {
          content: attr(data-text);
          position: absolute;
          white-space: nowrap;
          opacity: 0.4;
          font-size: 6vw;
          line-height: 1;
        }

        .background-text::before {
          top: -5%;
          left: 0;
          transform: translateY(-50%);
        }

        .background-text::after {
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
      `}</style>

      {/* About Section */}
      <section className="py-20 px-4 bg-lime-800">
        <div className="max-w-4xl mx-auto">
          <h2 className={cn('text-5xl mb-8 text-lime-200', anton.className)}>
            about me
          </h2>
          <p className="text-xl mb-8">{description}</p>
          <div className="flex flex-wrap gap-4 mb-8">
            {skills.map((skill, index) => (
              <Badge
                key={index}
                className="bg-lime-200 hover:bg-lime-300 text-lime-900 text-lg py-2 px-4"
              >
                {skill}
              </Badge>
            ))}
          </div>
          <Button
            onClick={() => (window.location.href = `mailto:${userEmail}`)}
            className="bg-lime-200 hover:bg-lime-300 text-lime-900 text-xl py-3 px-8"
          >
            <Mail className="mr-2 w-6 h-6" /> contact me
          </Button>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className={cn('text-5xl mb-12 text-lime-200', anton.className)}>
            experience
          </h2>
          {workExperiences.map((job: any, index) => (
            <motion.div
              key={job.company}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="mb-12 last:mb-0"
            >
              <h3 className="text-2xl font-bold text-lime-300 mb-2">
                {job.title}
              </h3>
              <p className="text-xl mb-2 flex items-center">
                <Building className="w-5 h-5 mr-2" /> {job.company}
              </p>
              <p className="text-lg mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" /> {job.date}
              </p>
              <p className="text-lg">{job.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 px-4 bg-lime-800">
        <div className="max-w-4xl mx-auto">
          <h2 className={cn('text-5xl mb-12 text-lime-200', anton.className)}>
            education
          </h2>
          {education.map((school: any, index) => (
            <motion.div
              key={school.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="mb-8 last:mb-0"
            >
              <h3 className="text-2xl font-bold text-lime-300 mb-2">
                {school.name}
              </h3>
              <p className="text-xl mb-2">{school.degree}</p>
              <p className="text-lg flex items-center">
                <Calendar className="w-5 h-5 mr-2" /> {school.date}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
