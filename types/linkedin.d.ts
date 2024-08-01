export type WorkExperience = {
  title: string;
  company: string;
  date: string;
  description: string;
};

export type Education = {
  name: string;
  degree: string;
  date: string;
};

export type LinkedInProfile = {
  firstName: string;
  lastName: string;
  photoUrl: string;
  title: string;
  description: string;
  linkedInUrl: string;
  workExperiences: any;
  education: any;
  skills: any;
};
