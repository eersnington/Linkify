'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { LinkedInProfile } from '@prisma/client';

type DataContextType = {
  linkedInProfile: LinkedInProfile | null;
  updateLinkedInProfile: (profile: LinkedInProfile) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function LinkedInDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [linkedInProfile, setLinkedInProfile] =
    useState<LinkedInProfile | null>(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem('linkedInProfile');
    if (storedProfile) {
      setLinkedInProfile(JSON.parse(storedProfile));
    }
  }, []);

  const updateLinkedInProfile = (profile: LinkedInProfile) => {
    console.log('Updating LinkedIn profile:', profile);
    setLinkedInProfile(profile);
    localStorage.setItem('linkedInProfile', JSON.stringify(profile));
  };

  return (
    <DataContext.Provider value={{ linkedInProfile, updateLinkedInProfile }}>
      {children}
    </DataContext.Provider>
  );
}

export function useLinkedInData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error(
      'useLinkedInData must be used within a LinkedInDataProvider'
    );
  }
  return context;
}
