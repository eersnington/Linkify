'use server';

import axios from 'axios';
import { env } from '@/env.mjs';
import { ctaFormSchema } from '@/lib/validations/user';
import { sample_linkedin_response } from '@/lib/sample-response';
import { LinkedInProfile } from '@prisma/client';

const TEST_MODE = false;

export type FormData = {
  email: string;
};

type DatePart = {
  year: number;
  month: number;
  day: number;
};

type DateRange = {
  start: DatePart;
  end?: DatePart;
};

// Helper function to convert date part to string
const formatDatePart = (datePart: DatePart): string => {
  if (!datePart || (datePart.year === 0 && datePart.month === 0)) return '';
  const month =
    datePart.month > 0 ? datePart.month.toString().padStart(2, '0') : '01';
  return `${datePart.year}-${month}`;
};

// Helper function to convert date range to string
const formatDateRange = (dateRange: DateRange): string => {
  const start = formatDatePart(dateRange.start);
  const end = dateRange.end ? formatDatePart(dateRange.end) : 'Present';
  return start ? `${start} - ${end}` : `Until ${end}`;
};

const rapidAPICall = async (email: string, sample: boolean) => {
  if (sample) {
    console.log('Fetching Sample LinkedIn Profile...');
    await new Promise((resolve) => setTimeout(resolve, 6000));
    return sample_linkedin_response;
  }

  const apiKey = env.RAPID_API_KEY;
  const apiHost = 'lookup-contact.p.rapidapi.com';
  const url = `https://${apiHost}/email-to-linkedin`;

  try {
    const res = await axios.get(url, {
      params: { email },
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': apiHost,
      },
    });

    const response = res.data;
    console.log('LinkedIn Profile:', response);
    if (!response.success) {
      console.error('Error fetching LinkedIn profile:', response.message);
      return { status: 'error', message: 'Failed to fetch LinkedIn profile' };
    }

    return response;
  } catch (error) {
    console.error('Catch: Error fetching LinkedIn profile:', error);
    return { status: 'error', message: 'Failed to fetch LinkedIn profile' };
  }
};

const processLinkedInData = (response: any) => {
  const data = response.data;

  const firstName = data.firstName || 'John';
  const lastName = data.lastName || 'Doe';
  const title = data.headline || 'N/A';
  const description = data.about || 'N/A';
  const photoUrl =
    data.photoUrl || 'https://linkifyme.pro/images/portrats/person.png';
  const linkedInUrl = data.linkedInUrl || 'N/A';

  const workExperiences =
    data.positions?.map((position: any) => ({
      title: position.title,
      company: position.companyName,
      date: formatDateRange(position.startEndDate),
      description: position.description || '',
    })) || [];

  const education =
    data.schools?.map((edu: any) => ({
      name: edu.schoolName,
      degree: edu.degreeName,
      date: formatDateRange(edu.startEndDate),
      fieldOfStudy: edu.fieldOfStudy || '',
    })) || [];

  const skills = data.skills?.map((skill: any) => skill.name) || [];

  return {
    firstName,
    lastName,
    photoUrl,
    title,
    description,
    linkedInUrl,
    workExperiences,
    education,
    skills,
  };
};

export async function fetchLinkedInProfile(data: FormData) {
  const parsed = ctaFormSchema.safeParse(data);
  if (!parsed.success) {
    return { status: 'error', message: 'Invalid form data' };
  }

  const email = parsed.data.email;

  const response = await rapidAPICall(email, TEST_MODE);

  if (response.status === 'error') {
    return { status: 'error', message: 'Failed to fetch LinkedIn profile' };
  }

  const profileData = processLinkedInData(response);

  const linkedInProfile: LinkedInProfile = {
    id: 'anonymous',
    userEmail: email,
    ...profileData,
  };

  return {
    status: 'success',
    message: `Welcome, ${email}`,
    data: linkedInProfile,
  };
}
