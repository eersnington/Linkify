"use client";

// app/[userDomain]/UserPageContent.tsx
import React from "react";
import { useThemeTemplate } from "@/context/editor-sidebar-context";

interface UserPageContentProps {
  profile: {
    fullName: string;
    photoUrl: string;
    title: string;
    description: string;
    workExperiences: any[];
    education: any[];
  };
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
      <main className="w-full">
        <SelectedTemplateComponent
          fullName={profile.fullName}
          photoUrl={profile.photoUrl}
          title={profile.title}
          description={profile.description}
          workExperiences={profile.workExperiences}
          education={profile.education}
        />
      </main>
    </div>
  );
}
