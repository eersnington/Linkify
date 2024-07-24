"use client";

import React from "react";
import { useThemeTemplate } from "@/context/editor-sidebar-context";
import { useLinkedInProfile } from "@/context/linkedin-profile-context";

import { ScrollArea } from "@/components/ui/scroll-area";

const PageCanvas = () => {
  const { templates, selectedTemplate } = useThemeTemplate();
  const { profile } = useLinkedInProfile();

  const SelectedTemplateComponent = templates[selectedTemplate]?.component;

  return (
    <ScrollArea className="rounded-md p-4 shadow-lg">
      {SelectedTemplateComponent && (
        <SelectedTemplateComponent
          fullName={profile.fullName}
          photoUrl={profile.photoUrl}
          title={profile.title}
          description={profile.description}
          workExperiences={profile.workExperiences}
          education={profile.education}
        />
      )}
    </ScrollArea>
  );
};

export default PageCanvas;
