// lib/validation/linkedin-profile.ts
import { z } from 'zod';

const workExperienceFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  company: z.string().min(1, 'Company name is required'),
  date: z.string().min(1, 'Date is required'),
  description: z.string().min(1, 'Description is required'),
});

const educationFormSchema = z.object({
  name: z.string().min(1, 'School name is required'),
  degree: z.string().min(1, 'Degree name is required'),
  date: z.string().min(1, 'Date is required'),
});

export const linkedInProfileFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  photoUrl: z.string().url('Invalid URL'),
  workExperiences: z.array(workExperienceFormSchema),
  education: z.array(educationFormSchema),
});

export const AILinkedInProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  photoUrl: z.string(),
  title: z.string(),
  description: z.string(),
  linkedInUrl: z.string(),
  certifications: z.array(
    z.object({
      name: z.string(),
      organization: z.string(),
      date: z.string(),
    })
  ),
  workExperiences: z.array(
    z.object({
      title: z.string(),
      company: z.string(),
      date: z.string(),
      description: z.string(),
    })
  ),
  education: z.array(
    z.object({
      name: z.string(),
      degree: z.string(),
      date: z.string(),
    })
  ),
  skills: z.array(z.string()),
});

export type LinkedInProfileFormData = z.infer<typeof linkedInProfileFormSchema>;
export type AILinkedInProfileFormData = z.infer<typeof AILinkedInProfileSchema>;
