'use client';

import React from 'react';
import { useThemeTemplate } from '@/context/editor-sidebar-context';

import { ScrollArea } from '@/components/ui/scroll-area';
import { useLinkedInData } from '@/context/linkedin-data-context';

import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

const PageCanvas = () => {
  const { templates, selectedTemplate } = useThemeTemplate();
  const { linkedInProfile } = useLinkedInData();
  const { isSignedIn } = useUser(); // Use the useUser hook to get user info
  const router = useRouter();

  if (isSignedIn) {
    return router.push('/mypage');
  }

  if (!linkedInProfile) {
    return (
      <div className="w-full">
        LinkedIn Profile is not loaded. Please start the onboarding again
      </div>
    );
  }

  const SelectedTemplateComponent = templates[selectedTemplate]?.component;

  return (
    <ScrollArea className="rounded-md p-4 shadow-lg">
      {SelectedTemplateComponent && (
        <SelectedTemplateComponent profile={linkedInProfile} />
      )}
    </ScrollArea>
  );
};

export default PageCanvas;
