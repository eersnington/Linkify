'use client';

import React, { useState } from 'react';
import { useThemeTemplate } from '@/context/editor-sidebar-context';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLinkedInData } from '@/context/linkedin-data-context';
import UploadCVButton from '../upload-cv-button';
import { fetchLinkedInProfile } from '@/actions/fetch-linkedin';
import { useUser } from '@clerk/nextjs';

export function PageCanvas() {
  const { user } = useUser();
  const { templates, selectedTemplate } = useThemeTemplate();
  const { linkedInProfile, updateLinkedInProfile } = useLinkedInData();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchLinkedIn = async () => {
    if (user) {
      try {
        setLoading(true);
        const response = await fetchLinkedInProfile({
          email: user.emailAddresses[0].emailAddress || 'example@gmail.com',
        });
        if (response.status === 'success' && response.data) {
          updateLinkedInProfile(response.data);
        } else {
          setError('Failed to fetch LinkedIn profile');
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        );
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!linkedInProfile) {
    return (
      <div className="w-1/3 flex flex-col items-center text-center justify-center">
        <p>
          You have not connected your LinkedIn profile yet. Please connect your
          LinkedIn profile to generate a resume, or you can upload your CV.
        </p>
        <UploadCVButton />
        <button onClick={handleFetchLinkedIn}>Fetch LinkedIn Profile</button>
      </div>
    );
  }

  const SelectedTemplateComponent = templates[selectedTemplate]?.component;

  const processedProfile = {
    ...linkedInProfile,
  };

  return (
    <ScrollArea className="rounded-md p-4 shadow-lg">
      {SelectedTemplateComponent ? (
        <SelectedTemplateComponent
          key={JSON.stringify(processedProfile)}
          profile={processedProfile}
        />
      ) : (
        <div>No template selected</div>
      )}
    </ScrollArea>
  );
}
