'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Mail,
  Calendar,
  Building,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { LinkedInProfile as TemplateProps } from '@prisma/client';

export function BasicTemplate({ profile }: { profile: TemplateProps }) {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 max-w-4xl"
    >
      <Card className="mb-8 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-300 to-purple-300 h-32"></div>
        <CardContent className="p-6 relative">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <Image
              src={photoUrl}
              alt={firstName + ' ' + lastName}
              width={200}
              height={200}
              className="rounded-full shadow-lg border-4 border-white absolute top-0 transform -translate-y-1/2"
            />
            <div className="md:ml-56 mt-24 md:mt-0">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {firstName + ' ' + lastName}
                  </h1>
                  <p className="text-xl font-semibold text-purple-600 mb-4">
                    {title}
                  </p>
                </div>
                <Button
                  onClick={() => (window.location.href = `mailto:${userEmail}`)}
                  className="bg-purple-500 hover:bg-purple-600 text-white rounded-full"
                >
                  <Mail className="mr-2 w-6 h-6" /> Contact Me
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {skills.slice(0, 5).map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-yellow-100 text-yellow-800"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
              <p className="text-gray-600 mb-4">{description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  {userEmail}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-semibold text-blue-600">
            <Briefcase className="mr-2" /> Work Experience
          </CardTitle>
        </CardHeader>
        <CardContent>
          {workExperiences.map((job: any, index: number) => (
            <motion.div
              key={job.company}
              className="mb-8 last:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <h3 className="text-xl font-semibold text-blue-700">
                  {job.title}
                </h3>
                <span className="text-sm text-blue-500 flex items-center">
                  <Calendar className="w-4 h-4 mr-1" /> {job.date}
                </span>
              </div>
              <p className="text-blue-600 mb-2 flex items-center">
                <Building className="w-4 h-4 mr-2" /> {job.company}
              </p>
              <p className="text-gray-700">{job.description}</p>
              {index < workExperiences.length - 1 && (
                <Separator className="my-6" />
              )}
            </motion.div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-semibold text-purple-600">
            <GraduationCap className="mr-2" /> Education
          </CardTitle>
        </CardHeader>
        <CardContent>
          {education.map((school: any, index: number) => (
            <motion.div
              key={school.name}
              className="mb-6 last:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <h3 className="text-xl font-semibold text-purple-700">
                  {school.name}
                </h3>
                <span className="text-sm text-purple-500 flex items-center">
                  <Calendar className="w-4 h-4 mr-1" /> {school.date}
                </span>
              </div>
              <p className="text-purple-600">{school.degree}</p>
              {index < education.length - 1 && <Separator className="my-4" />}
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
