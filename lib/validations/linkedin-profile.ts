// lib/validation/linkedin-profile.ts
import { z } from "zod";

const workExperienceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company name is required"),
  date: z.string().min(1, "Date is required"),
  description: z.string().min(1, "Description is required"),
});

const educationSchema = z.object({
  name: z.string().min(1, "School name is required"),
  degree: z.string().min(1, "Degree name is required"),
  date: z.string().min(1, "Date is required"),
});

export const linkedInProfileSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  photoUrl: z.string().url("Invalid URL"),
  workExperiences: z.array(workExperienceSchema),
  education: z.array(educationSchema),
});

export type LinkedInProfileFormData = z.infer<typeof linkedInProfileSchema>;
