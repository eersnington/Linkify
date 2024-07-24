"use server";

import { revalidatePath } from "next/cache";
import axios from "axios";

import { env } from "@/env.mjs";
import { LinkedInProfile } from "@/types/linkedin";
import { prisma } from "@/lib/db";
import { ctaFormSchema } from "@/lib/validations/user";

// Example Response:
// const response = {
//   certifications: {
//     certificationHistory: [
//       {
//         issuedDate: "Issued Jan 2022",
//         name: "Problem Solving (Intermediate)",
//         organizationName: "HackerRank",
//         organizationUrl: "https://www.linkedin.com/company/435210/",
//       },
//       {
//         issuedDate: "Issued Jan 2022",
//         name: "Python (Basic)",
//         organizationName: "HackerRank",
//         organizationUrl: "https://www.linkedin.com/company/435210/",
//       },
//       {
//         issuedDate: "Issued Dec 2020",
//         name: "Artificial Intelligence in Python",
//         organizationName: "Great Learning",
//         organizationUrl: "https://www.linkedin.com/company/9282020/",
//       },
//       {
//         issuedDate: "Issued Dec 2020",
//         name: "Data Visualization using Python",
//         organizationName: "Great Learning",
//         organizationUrl: "https://www.linkedin.com/company/9282020/",
//       },
//     ],
//     certificationsCount: 4,
//   },
//   creationDate: { month: 10, year: 2021 },
//   firstName: "Sree",
//   followerCount: 324,
//   headline: "Co-Founder @ ZaplineAI | ML Engineer",
//   languages: [],
//   lastName: "Narayanan",
//   linkedInIdentifier: "ACoAADhRgAsB1AyXAS2g9uBwH3x4PkI-Mki7laY",
//   linkedInUrl: "https://www.linkedin.com/in/sreenington",
//   location: "Dubai, United Arab Emirates",
//   openToWork: false,
//   photoUrl:
//     "https://media.licdn.com/dms/image/D4D03AQEI30oewhEYqQ/profile-displayphoto-shrink_800_800/0/1696268580451?e=1727308800&v=beta&t=8_0GJHiPfpTALjLOnSE3Yp0jXiu5NnnimKByC_XiSLs",
//   positions: {
//     positionHistory: [
//       {
//         companyLocation: "Coimbatore, Tamil Nadu, India",
//         companyLogo:
//           "https://media.licdn.com/dms/image/D4D0BAQEqQBdQjWpu1w/company-logo_400_400/0/1719147804240/zaplineai_logo?e=1729728000&v=beta&t=1PMfwrOzmqEkbx1WxDwn6YooOhVK_Iv9IEeNm_cRPmk",
//         companyName: "ZaplineAI",
//         contractType: "Full-time",
//         description:
//           "As the Technical Co-Founder at ZaplineAI, my work is to build, break, and improve the tech. My key responsibilities include:\n\n- Developing the Backend in FastAPI to serve the Frontend and handle Twilio Calls.\n- Finetuning LLM Models and Classifiers for call workflows and Intent Identification.\n- LLMOps, to ensure our bot scales well.\n- Developing a responsive Frontend in Next.js\n- Make decisions on what's the right area of focus and what technologies to use.",
//         linkedInId: "101070592",
//         linkedInUrl: "https://www.linkedin.com/company/101070592/",
//         startEndDate: { end: null, start: { month: 8, year: 2023 } },
//         title: "Co-Founder",
//       },
//     ],
//     positionsCount: 1,
//   },
//   publicIdentifier: "sreenington",
//   recommendations: { recommendationHistory: [], recommendationsCount: 0 },
//   schools: {
//     educationHistory: [
//       {
//         degreeName: "Bsc in Programming and Data Science",
//         description: "Online mode",
//         fieldOfStudy: "Bsc in Programming and Data Science",
//         linkedInUrl: "https://www.linkedin.com/company/157267/",
//         schoolLogo:
//           "https://media.licdn.com/dms/image/C4D0BAQGqbSuxjLqtWQ/company-logo_400_400/0/1659504006681/reachiitm_logo?e=1729728000&v=beta&t=CSkuZfsROtf2B09AhPdZoHnKHl2gz3v8IOTulSrHnMc",
//         schoolName: "Indian Institute of Technology, Madras",
//         startEndDate: {
//           end: { month: 1, year: 2025 },
//           start: { month: 1, year: 2022 },
//         },
//       },
//       {
//         degreeName: "Bachelor of Science - BSc, Computer Science",
//         description: null,
//         fieldOfStudy: "Bachelor of Science - BSc, Computer Science",
//         linkedInUrl: "https://www.linkedin.com/company/15115952/",
//         schoolLogo:
//           "https://media.licdn.com/dms/image/C4E0BAQHBjcLiwupXIg/company-logo_400_400/0/1630586897671/psg_college_of_arts_and_science_logo?e=1729728000&v=beta&t=eJd_LxsvOPnW5Bv77DdSc61ykIaYaknBagqyzttNFls",
//         schoolName: "PSG College of Arts and Science",
//         startEndDate: {
//           end: { month: 1, year: 2024 },
//           start: { month: 9, year: 2021 },
//         },
//       },
//       {
//         degreeName:
//           "High School Diploma (AISSCE), Physics, Chemistry, Biology and Mathematics",
//         description: null,
//         fieldOfStudy:
//           "High School Diploma (AISSCE), Physics, Chemistry, Biology and Mathematics",
//         linkedInUrl:
//           "https://www.linkedin.com/search/results/all/?keywords=JSS+Private+School%2C+Dubai",
//         schoolLogo: null,
//         schoolName: "JSS Private School, Dubai",
//         startEndDate: {
//           end: { month: null, year: null },
//           start: { month: 7, year: 2021 },
//         },
//       },
//     ],
//     educationsCount: 3,
//   },
//   skills: [
//     "Golang",
//     "Product Management",
//     "Google Cloud Platform (GCP)",
//     "AWS Lambda",
//     "Amazon Web Services (AWS)",
//     "Twilio",
//     "Product Road Mapping",
//     "Neural Networks",
//     "Flask",
//     "API Development",
//     "Transformers",
//     "Computer Science",
//     "Start-up Leadership",
//     "Full-Stack Development",
//     "Statistics",
//     "Data Science",
//     "Applied Machine Learning",
//     "Business Analysis",
//     "Machine Learning",
//     "Algorithms",
//   ],
//   summary:
//     "Hi, I'm Sree. I hold a degree in Computer Science from PSG College of Arts and Science and am currently pursuing a dual degree in Data Science and Programming at IITM. My journey in technology has been exhilarating, with a particular fascination for Artificial Intelligence. I specialize in backend development, with extensive experience in building robust APIs and scalable systems.\n\nFeel free to check out some of my projects on GitHub:\nhttps://github.com/eersnington",
//   phoneNumbers: [],
//   email: "sreeaadhi07@gmail.com",
// };

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

// helper function to convert date part to string
const formatDatePart = (datePart: DatePart): string => {
  if (!datePart || (datePart.month === null && datePart.year === null)) {
    return "";
  }
  const month = datePart.month === null ? "" : datePart.month;
  const year = datePart.year === null ? "" : datePart.year;
  return [month, year].filter(Boolean).join("/");
};

// helper function to convert date range to string
const formatDateRange = (dateRange: DateRange): string => {
  const start = formatDatePart(dateRange.start);
  const end = dateRange.end ? formatDatePart(dateRange.end) : "Present";

  if (!start && !end) {
    return "";
  }

  if (!start) {
    return `Until ${end}`;
  }

  if (end === "Present" || !end) {
    return `${start} - Present`;
  }

  return `${start} - ${end}`;
};

async function rapidAPICall(email: string) {
  const apiKey = env.RAPID_API_KEY; // Ensure the environment variable is named correctly
  const apiHost = "email-to-linkedin-profile-finder-api.p.rapidapi.com";
  const url = `https://${apiHost}/v1/rapidapi/person`;

  try {
    const res = await axios.get(url, {
      params: { email },
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": apiHost,
      },
    });
  
    const response = res.data;
  
    if (response.error) {
      console.error("Error fetching LinkedIn profile:", response.error);
      return {
        status: "error",
        message: "Failed to fetch LinkedIn profile",
      };
    }

    return response;
  
  } catch (error) {
    console.error("Error fetching LinkedIn profile:", error);
    return {
      status: "error",
      message: "Failed to fetch LinkedIn profile",
    };
  }
}

/*
 *
 *
 * Fetch the LinkedIn profile for a given email using RapidAPI
 *
 *
 */

export async function getLinkedInProfile(data: FormData) {
  const parsed = ctaFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Invalid form data",
    };
  }

  const email = parsed.data.email;

  const response = await rapidAPICall(email);

  if (response.status === "error") {
    return {
      status: "error",
      message: "Failed to fetch LinkedIn profile",
    };
  }

  console.log(response)

  const fullName = response.firstName + " " + response.lastName;
  const title = response.headline || "N/A";
  const description = response.summary || "N/A";
  const photoUrl = response.photoUrl || "/images/placeholder";
  const linkedInUrl = response.linkedInUrl || "N/A";

  const certifications = response.certifications.certificationHistory.map(
    (cert: any) => ({
      name: cert.name,
      degree: cert.name, // Use name for degree as there's no separate degree field
      date: cert.issuedDate,
    }),
  ) || [
    {
      name: "N/A",
      degree: "N/A",
      date: "N/A",
    },
  ];

  const workExperiences = response.positions.positionHistory.map(
    (position: any) => ({
      title: position.title,
      company: position.companyName,
      date: formatDateRange(position.startEndDate as DateRange),
      description: position.description,
    }),
  ) || [
    {
      title: "N/A",
      company: "N/A",
      date: "N/A",
      description: "N/A",
    },
  ];

  const recommendations =
    response.recommendations.recommendationHistory.length > 0
      ? response.recommendations.recommendationHistory
      : [
          {
            recommendation: "N/A",
            recommendationDate: { month: 1, year: 2000 },
            recommenderFirstName: "N/A",
            recommenderLastName: "N/A",
            recommenderTitle: "N/A",
          },
        ];

  const education = response.schools.educationHistory.map((edu: any) => ({
    name: edu.schoolName,
    degree: edu.degreeName,
    date: formatDateRange(edu.startEndDate as DateRange),
  })) || [
    {
      name: "N/A",
      degree: "N/A",
      date: "N/A",
    },
  ];

  const skills = response.skills.length > 0 ? response.skills : ["N/A"];

  try {
    // Ensure the user exists or create a new user
    await prisma.user.upsert({
      where: { email: data.email },
      update: {},
      create: {
        email: data.email,
      },
    });

    await prisma.linkedInProfile.upsert({
      where: { userEmail: data.email },
      update: {
        fullName,
        title,
        description,
        linkedInUrl,
        photoUrl,
        certifications,
        workExperiences,
        recommendations,
        education,
        skills,
      },
      create: {
        userEmail: data.email,
        fullName,
        title,
        description,
        linkedInUrl,
        photoUrl,
        certifications,
        workExperiences,
        recommendations,
        education,
        skills,
      },
    });

    return {
      status: "success",
      message: `Welcome, ${email}`,
      data: response,
    };
  } catch (error) {
    console.error("Error saving LinkedIn profile:", error);
    return {
      status: "error",
      message: "Failed to save LinkedIn profile",
    };
  }
}

/*
 *
 *
 * Get the stored LinkedIn profile for a user
 *
 *
 */

export async function getStoredProfile(email: string) {
  const dbProfile = await prisma.linkedInProfile.findUnique({
    where: { userEmail: email },
  });

  if (!dbProfile) {
    return {
      status: "error",
      message: "Profile not found",
    };
  }

  const linkedInProfile: LinkedInProfile = {
    fullName: dbProfile.fullName,
    photoUrl: dbProfile.photoUrl,
    title: dbProfile.title,
    description: dbProfile.description,
    workExperiences: dbProfile.workExperiences,
    education: dbProfile.education,
  };

  return {
    status: "success",
    message: "Profile found",
    data: linkedInProfile,
  };
}

export async function updateLinkedInProfile(
  email: string,
  data: LinkedInProfile,
) {
  try {
    await prisma.linkedInProfile.update({
      where: { userEmail: email },
      data: {
        fullName: data.fullName,
        title: data.title,
        description: data.description,
        photoUrl: data.photoUrl,
        workExperiences: data.workExperiences,
        education: data.education,
      },
    });
    // revalidatePath(`/onboard/mypage?email=${email}`);

    return { status: "success" };
  } catch (error) {
    console.error("Error updating LinkedIn profile:", error);
    return { status: "error", error };
  }
}
