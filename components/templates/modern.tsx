"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { LinkedInProfile as TemplateProps } from "@/types/linkedin";
import { cn } from "@/lib/utils";
import { dm_display, pf_display } from "@/app/fonts";

export function ModernTemplate({
  fullName,
  title,
  description,
  photoUrl,
  workExperiences,
  education,
}: TemplateProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center lg:flex-row lg:justify-between"
          >
            <div className="mb-8 lg:mb-0 lg:mr-8">
              <h1
                className={cn(
                  "mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-8xl font-bold text-transparent",
                  dm_display.className,
                )}
              >
                {fullName}
              </h1>
              <p className={cn("text-4xl text-blue-300", pf_display.className)}>
                {title}
              </p>
            </div>
            <Image
              src={photoUrl}
              alt={fullName}
              width={150}
              height={150}
              className="size-64 rounded-full border-4 border-blue-500"
            />
          </motion.div>
        </header>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-20"
        >
          <p className="max-w-2xl text-xl text-blue-100">{description}</p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="mb-8 text-3xl font-bold text-blue-300">Experience</h2>
          {workExperiences.map((job: any, index: number) => (
            <div
              key={job.company}
              className="mb-8 border-l-2 border-blue-500 pl-6"
            >
              <h3 className="text-2xl font-bold text-blue-100">{job.title}</h3>
              <p className="text-xl text-blue-300">{job.company}</p>
              <p className="text-blue-400">{job.date}</p>
              <p className="mt-2 text-blue-100">{job.description}</p>
            </div>
          ))}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="mb-8 text-3xl font-bold text-blue-300">Education</h2>
          {education.map((school: any, index: number) => (
            <div
              key={school.name}
              className="mb-8 border-l-2 border-blue-500 pl-6"
            >
              <h3 className="text-2xl font-bold text-blue-100">
                {school.name}
              </h3>
              <p className="text-xl text-blue-300">{school.degree}</p>
              <p className="text-blue-400">{school.date}</p>
            </div>
          ))}
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center"
        >
          <button className="group inline-flex items-center text-lg font-semibold text-blue-400 transition-colors hover:text-blue-300">
            Get in touch
            <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
