'use client';

import React from 'react';
import { useThemeTemplate } from '@/context/editor-sidebar-context';

import { ScrollArea } from '@/components/ui/scroll-area';
import { useLinkedInData } from '@/context/linkedin-data-context';

type LinkedInProfile = {
  firstName: string;
  lastName: string;
  photoUrl: string;
  title: string;
  description: string;
  linkedInUrl: string;
  certifications: any;
  workExperiences: any;
  recommendations: any;
  education: any;
  skills: any;
};

export function PageCanvas() {
  const { templates, selectedTemplate } = useThemeTemplate();
  const { linkedInProfile } = useLinkedInData();

  if (!linkedInProfile) {
    return (
      // TODO: Add a section which lets user upload a CV or a button to connect linkedin profile
      // TODO: Custo mQuestionnairse form
      <div className="w-full">
        LinkedIn Profile is not loaded. Please start the onboarding again
      </div>
    );
  }

  // const linkedinProfileSample = {
  //   // Jane Doe | Product Manager @ Discord | Write a catchy description for this
  //   firstName: 'Jane',
  //   lastName: 'Doe',
  //   photoUrl: '/images/portraits/woman_1.jpeg',
  //   title: 'Product Manager @ Discord',
  //   description:
  //     "I am a product manager with 5 years of experience in the tech industry. I have worked with companies like Microsoft and Discord. I am passionate about building products that make a difference in people's lives.",
  //   linkedInUrl: 'https://www.linkedin.com/in/janedoe',
  //   certifications: [
  //     {
  //       title: 'Certified Scrum Master',
  //       date: '2021',
  //     },
  //     {
  //       title: 'Product Management Certificate',
  //       date: '2020',
  //     },
  //   ],
  //   workExperiences: [
  //     {
  //       title: 'Product Manager',
  //       company: 'Discord',
  //       date: '2019 - Present',
  //       description:
  //         "I am responsible for the product strategy and roadmap for Discord's mobile app. I work closely with the engineering and design teams to deliver high-quality features that delight our users.",
  //     },
  //     {
  //       title: 'Product Manager',
  //       company: 'Microsoft',
  //       date: '2016 - 2019',
  //       description:
  //         "I led the product development for Microsoft's cloud services. I worked with cross-functional teams to deliver innovative solutions that met the needs of our enterprise customers.",
  //     },
  //   ],
  //   recommendations: [
  //     {
  //       name: 'John Smith',
  //       title: 'Engineering Manager at Discord',
  //     },
  //   ],
  //   education: [
  //     {
  //       name: 'University of California, Berkeley',
  //       degree: 'Bachelor of Science in Computer Science',
  //       date: '2020 - 2024',
  //     },
  //   ],
  // };

  const SelectedTemplateComponent = templates[selectedTemplate]?.component;

  return (
    <ScrollArea className="rounded-md p-4 shadow-lg">
      {SelectedTemplateComponent && (
        <SelectedTemplateComponent profile={linkedInProfile} />
      )}
    </ScrollArea>
  );
}
