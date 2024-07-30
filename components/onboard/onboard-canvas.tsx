'use client';

import React from 'react';
import { useThemeTemplate } from '@/context/editor-sidebar-context';

import { ScrollArea } from '@/components/ui/scroll-area';
import { useLinkedInData } from '@/context/linkedin-data-context';

export function DemoCanvas() {
  const { templates, selectedTemplate } = useThemeTemplate();
  const { linkedInProfile } = useLinkedInData();

  const SelectedTemplateComponent = templates[selectedTemplate]?.component;

  if (!linkedInProfile) {
    return <div>LinkedIn profile not found</div>;
  }

  const processsedProfile = {
    ...linkedInProfile,
    recommendations: [],
  };

  return (
    <ScrollArea className="rounded-md p-4 shadow-lg">
      {SelectedTemplateComponent && (
        <SelectedTemplateComponent profile={processsedProfile} />
      )}
    </ScrollArea>
  );
}
