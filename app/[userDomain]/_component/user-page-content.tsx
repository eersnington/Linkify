'use client';

// app/[userDomain]/UserPageContent.tsx
import React from 'react';
import { useThemeTemplate } from '@/context/editor-sidebar-context';
import { LinkedInProfile } from '@prisma/client';
import AnalyticsTracker from '@/components/analytics';

interface UserPageContentProps {
  profile: LinkedInProfile;
  templateId: number;
}

export default function UserPageContent({
  profile,
  templateId,
}: UserPageContentProps) {
  const { templates } = useThemeTemplate();
  const SelectedTemplateComponent = templates[templateId]?.component;

  if (!SelectedTemplateComponent) {
    return <div>Template not found</div>;
  }

  return (
    <div className="min-h-screen w-full">
      <AnalyticsTracker />
      <main className="w-full">
        <SelectedTemplateComponent
          profile={{
            ...profile,
            recommendations: [{ id: 1, text: 'Great work!' }],
          }}
        />
      </main>
    </div>
  );
}
