'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Mail,
  Calendar,
  Building,
  Menu,
  X,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { LinkedInProfile as TemplateProps } from '@prisma/client';

export function BasicWebTemplate({ profile }: { profile: TemplateProps }) {
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
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-purple-600">
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
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
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

      {/* Hero Section */}
      <motion.section
        id="about"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-purple-400 to-blue-500 text-white py-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="sm:w-1/3 mb-8 sm:mb-0">
              <Image
                src={photoUrl}
                alt={firstName + ' ' + lastName}
                width={250}
                height={250}
                className="rounded-full shadow-lg border-4 border-white"
              />
            </div>
            <div className="sm:w-2/3 sm:pl-8">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                {firstName + ' ' + lastName}
              </h1>
              <p className="text-xl sm:text-2xl mb-6">{title}</p>
              <p className="text-lg mb-8">{description}</p>
              <Button
                onClick={() => (window.location.href = `mailto:${userEmail}`)}
                className="bg-white text-purple-600 hover:bg-purple-100 rounded-full px-6 py-3 text-lg"
              >
                <Mail className="mr-2 w-5 h-5" /> Contact Me
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Experience Section */}
      <section id="experience" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex">
            <Briefcase className="size-8 mr-2" /> Work Experience
          </h2>
          {workExperiences.map((job: any, index: number) => (
            <motion.div
              key={job.company}
              className="mb-8 last:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {job.title}
                    </h3>
                    <span className="text-sm text-gray-600 flex items-center mt-2 sm:mt-0">
                      <Calendar className="w-4 h-4 mr-2" /> {job.date}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4 flex items-center">
                    <Building className="w-4 h-4 mr-2" /> {job.company}
                  </p>
                  <p className="text-gray-600">{job.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex">
            <GraduationCap className="size-8 mr-2" /> Education
          </h2>
          {education.map((school: any, index: number) => (
            <motion.div
              key={school.name}
              className="mb-6 last:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {school.name}
                    </h3>
                    <span className="text-sm text-gray-600 flex items-center mt-2 sm:mt-0">
                      <Calendar className="w-4 h-4 mr-2" /> {school.date}
                    </span>
                  </div>
                  <p className="text-gray-700">{school.degree}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Skills</h2>
          <div className="flex flex-wrap gap-4">
            {skills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-purple-100 text-purple-800 text-sm px-3 py-1"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
