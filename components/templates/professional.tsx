"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Briefcase, Download, GraduationCap, Mail } from "lucide-react";

import { LinkedInProfile as TemplateProps } from "@/types/linkedin";
import { cn } from "@/lib/utils";
import { dm_display, pf_display } from "@/app/fonts";

export function ProfessionalTemplate({
  fullName,
  title,
  description,
  photoUrl,
  workExperiences,
  education,
}: TemplateProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-700 py-16 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-8 md:mb-0">
              <h1
                className={cn("mb-2 text-4xl font-bold", dm_display.className)}
              >
                {fullName}
              </h1>
              <p className={cn("text-xl", pf_display.className)}>{title}</p>
            </div>
            <Image
              src={photoUrl}
              alt={fullName}
              width={150}
              height={150}
              className="rounded-full border-4 border-white shadow-lg"
            />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="md:col-span-2">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="mb-4 flex items-center text-2xl font-semibold text-blue-700">
                <Briefcase className="mr-2" size={24} /> Work Experience
              </h2>
              {workExperiences.map((job: any, index: number) => (
                <div key={job.company} className="mb-8 last:mb-0">
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <p className="font-medium text-blue-600">{job.company}</p>
                  <p className="mb-2 text-sm text-gray-600">{job.date}</p>
                  <p className="text-gray-700">{job.description}</p>
                </div>
              ))}
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className="mb-4 flex items-center text-2xl font-semibold text-blue-700">
                <GraduationCap className="mr-2" size={24} /> Education
              </h2>
              {education.map((school: any, index: number) => (
                <div key={school.name} className="mb-6 last:mb-0">
                  <h3 className="text-xl font-semibold">{school.name}</h3>
                  <p className="font-medium text-blue-600">{school.degree}</p>
                  <p className="text-sm text-gray-600">{school.date}</p>
                </div>
              ))}
            </motion.section>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mb-8 rounded-lg bg-white p-6 shadow-md"
            >
              <h2 className="mb-4 text-2xl font-semibold text-blue-700">
                About Me
              </h2>
              <p className="text-gray-700">{description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="rounded-lg bg-white p-6 shadow-md"
            >
              <h2 className="mb-4 text-2xl font-semibold text-blue-700">
                Contact
              </h2>
              <button className="mb-4 flex w-full items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
                <Mail className="mr-2" size={18} /> Email Me
              </button>
              <button className="flex w-full items-center justify-center rounded-full bg-gray-200 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-300">
                <Download className="mr-2" size={18} /> Download CV
              </button>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
