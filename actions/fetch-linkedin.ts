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
  month: string;
  year: string;
};

type DateRange = {
  start: DatePart;
  end?: DatePart;
};

// Helper function to convert date part to string
const formatDatePart = (datePart: DatePart): string => {
  if (!datePart) return '';
  const { month = '', year = '' } = datePart;
  return [month, year].filter(Boolean).join('/');
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
  const apiHost = 'email-to-linkedin-profile-finder-api.p.rapidapi.com';
  const url = `https://${apiHost}/v1/rapidapi/person`;

  try {
    const res = await axios.get(url, {
      params: { email },
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': apiHost,
      },
    });

    const response = res.data;
    if (response.error) {
      console.error('Error fetching LinkedIn profile:', response.error);
      return { status: 'error', message: 'Failed to fetch LinkedIn profile' };
    }

    return response;
  } catch (error) {
    console.error('Catch: Error fetching LinkedIn profile:', error);
    return { status: 'error', message: 'Failed to fetch LinkedIn profile' };
  }
};

const processLinkedInData = (response: any) => {
  const defaultData = { name: 'N/A', degree: 'N/A', date: 'N/A' };
  const firstName = response.firstName || 'John';
  const lastName = response.lastName || 'Doe';
  const title = response.headline || 'N/A';
  const description = response.summary || 'N/A';
  const photoUrl = response.photoUrl || '/images/placeholder';
  const linkedInUrl = response.linkedInUrl || 'N/A';

  const certifications = response.certifications?.certificationHistory?.map(
    (cert: any) => ({
      name: cert.name,
      organization: cert.organizationName,
      date: cert.issuedDate,
    })
  ) || [defaultData];

  const workExperiences = response.positions?.positionHistory?.map(
    (position: any) => ({
      title: position.title,
      company: position.companyName,
      date: formatDateRange(position.startEndDate as DateRange),
      description: position.description,
    })
  ) || [defaultData];

  // const recommendations =
  //   response.recommendations?.recommendationHistory?.length > 0
  //     ? response.recommendations.recommendationHistory
  //     : [
  //         {
  //           recommendation: 'N/A',
  //           recommendationDate: { month: 1, year: 2000 },
  //           recommenderFirstName: 'N/A',
  //           recommenderLastName: 'N/A',
  //           recommenderTitle: 'N/A',
  //         },
  //       ];

  const education = response.schools?.educationHistory?.map((edu: any) => ({
    name: edu.schoolName,
    degree: edu.degreeName,
    date: formatDateRange(edu.startEndDate as DateRange),
  })) || [defaultData];

  const skills = response.skills?.length > 0 ? response.skills : ['N/A'];

  return {
    firstName,
    lastName,
    photoUrl,
    title,
    description,
    linkedInUrl,
    certifications,
    workExperiences,
    // recommendations,
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

  const response = await rapidAPICall(email, TEST_MODE); // set to false to make a real API call

  if (response.status === 'error') {
    return { status: 'error', message: 'Failed to fetch LinkedIn profile' };
  }

  const {
    firstName,
    lastName,
    photoUrl,
    title,
    description,
    linkedInUrl,
    certifications,
    workExperiences,
    // recommendations,
    education,
    skills,
  } = processLinkedInData(response); // sample_linkedin_response || response;

  const linkedInProfile: LinkedInProfile = {
    id: 'anonymous',
    userEmail: email,
    firstName,
    lastName,
    photoUrl,
    title,
    description,
    linkedInUrl,
    certifications,
    workExperiences,
    // recommendations,
    education,
    skills,
  };

  return {
    status: 'success',
    message: `Welcome, ${email}`,
    data: linkedInProfile,
  };
}
