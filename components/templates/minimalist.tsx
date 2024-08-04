'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import { LinkedInProfile as TemplateProps } from '@prisma/client';
import { cn } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function MinimalistTemplate({ profile }: { profile: TemplateProps }) {
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-black">
                  {firstName[0] + lastName[0]}
                </span>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <a
                href="#about"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                About
              </a>
              <a
                href="#experience"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Experience
              </a>
              <a
                href="#education"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Education
              </a>
              <a
                href="#skills"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Skills
              </a>
            </div>
            <div className="sm:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
              >
                {isMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                About
              </a>
              <a
                href="#experience"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Experience
              </a>
              <a
                href="#education"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Education
              </a>
              <a
                href="#skills"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Skills
              </a>
            </div>
          </div>
        )}
      </nav>

      <main className="mx-auto max-w-3xl px-4 py-16">
        <motion.section
          id="about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <Image
            src={photoUrl}
            alt={firstName + ' ' + lastName}
            width={80}
            height={80}
            className="mb-6 rounded-full"
          />
          <h1 className={cn('mb-2 text-4xl font-bold font-sans')}>
            {firstName + ' ' + lastName}
          </h1>
          <p className={cn('mb-4 text-xl text-gray-600')}>{title}</p>
          <p className="mb-6 max-w-2xl text-gray-700">{description}</p>
          <Button
            onClick={() => (window.location.href = `mailto:${userEmail}`)}
            className="bg-black text-white hover:bg-gray-800"
          >
            Contact Me
          </Button>
        </motion.section>

        <motion.section
          id="experience"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="mb-6 text-2xl font-semibold">Experience</h2>
          {workExperiences.map((job: any, index: number) => (
            <div key={job.company} className="mb-8 last:mb-0">
              <h3 className="text-lg font-medium">{job.title}</h3>
              <p className="text-gray-600">{job.company}</p>
              <p className="mb-2 text-sm text-gray-500">{job.date}</p>
              <p className="text-gray-700">{job.description}</p>
            </div>
          ))}
        </motion.section>

        <motion.section
          id="education"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="mb-6 text-2xl font-semibold">Education</h2>
          {education.map((school: any, index: number) => (
            <div key={school.name} className="mb-6 last:mb-0">
              <h3 className="text-lg font-medium">{school.name}</h3>
              <p className="text-gray-600">{school.degree}</p>
              <p className="text-sm text-gray-500">{school.date}</p>
            </div>
          ))}
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="mb-4 text-2xl font-semibold">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge
                key={index}
                className="bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
