"use client";

import React, { createContext, useContext, useState } from "react";

import { LinkedInProfileFormData } from "@/lib/validations/linkedin-profile";

interface LinkedInProfileContextType {
  profile: LinkedInProfileFormData;
  updateProfile: (newProfile: LinkedInProfileFormData) => void;
}

const LinkedInProfileContext = createContext<
  LinkedInProfileContextType | undefined
>(undefined);

export const LinkedInProfileProvider: React.FC<{
  initialProfile: LinkedInProfileFormData;
  children: React.ReactNode;
}> = ({ initialProfile, children }) => {
  const [profile, setProfile] =
    useState<LinkedInProfileFormData>(initialProfile);

  const updateProfile = (newProfile: LinkedInProfileFormData) => {
    setProfile(newProfile);
  };

  return (
    <LinkedInProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </LinkedInProfileContext.Provider>
  );
};

export const useLinkedInProfile = () => {
  const context = useContext(LinkedInProfileContext);
  if (context === undefined) {
    throw new Error(
      "useLinkedInProfile must be used within a LinkedInProfileProvider",
    );
  }
  return context;
};
