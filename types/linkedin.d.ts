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
  fullName: string;
  title: string;
  description: string;
  photoUrl: string;
  workExperiences: any;
  education: any;
};
