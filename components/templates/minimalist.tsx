"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { LinkedInProfile as TemplateProps } from "@/types/linkedin";
import { cn } from "@/lib/utils";
import { dm_display, pf_display } from "@/app/fonts";

export function MinimalistTemplate({
  fullName,
  title,
  description,
  photoUrl,
  workExperiences,
  education,
}: TemplateProps) {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <Image
            src={photoUrl}
            alt={fullName}
            width={120}
            height={120}
            className="mx-auto mb-6 rounded-full"
          />
          <h1 className={cn("mb-2 text-4xl font-bold", dm_display.className)}>
            {fullName}
          </h1>
          <p className={cn("text-xl text-emerald-500", pf_display.className)}>
            {title}
          </p>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-lg leading-relaxed">{description}</p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="mb-6 text-2xl font-semibold text-emerald-500">
            Experience
          </h2>
          {workExperiences.map((job: any, index: number) => (
            <div key={job.company} className="mb-8 last:mb-0">
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="text-emerald-500">{job.company}</p>
              <p className="mb-2 text-sm text-slate-600">{job.date}</p>
              <p className="text-slate-700">{job.description}</p>
            </div>
          ))}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="mb-6 text-2xl font-semibold text-emerald-500">
            Education
          </h2>
          {education.map((school: any, index: number) => (
            <div key={school.name} className="mb-6 last:mb-0">
              <h3 className="text-xl font-semibold">{school.name}</h3>
              <p className="text-emerald-500">{school.degree}</p>
              <p className="text-sm text-slate-600">{school.date}</p>
            </div>
          ))}
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center"
        >
          <button className="text-emerald-500 transition-colors hover:text-emerald-600">
            Get in touch
          </button>
        </motion.div>
      </div>
    </div>
  );
}
