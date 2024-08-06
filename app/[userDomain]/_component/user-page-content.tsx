'use client';

// app/[userDomain]/UserPageContent.tsx
import React from 'react';
import { useThemeTemplate } from '@/context/editor-sidebar-context';
import { LinkedInProfile } from '@prisma/client';
import { Button } from '@/components/ui/button';
import Logo from '@/components/shared/logo';
import { env } from '@/env.mjs';
import Link from 'next/link';

const url = env.NEXT_PUBLIC_APP_URL;

interface UserPageContentProps {
  profile: LinkedInProfile;
  templateId: number;
  isPremium: boolean;
}

export default function UserPageContent({
  profile,
  templateId,
  isPremium,
}: UserPageContentProps) {
  const { templates } = useThemeTemplate();
  const SelectedTemplateComponent = templates[templateId]?.component;

  if (!SelectedTemplateComponent) {
    return <div>Template not found</div>;
  }

  return (
    <div className="min-h-screen w-full relative">
      <main className="w-full">
        <SelectedTemplateComponent
          profile={{
            ...profile,
          }}
        />
      </main>
      {!isPremium && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full inline-flex bg-white shadow-md hover:bg-gray-100 transition-colors duration-200"
          >
            <Logo className="w-6 h-6 mr-2" />
            <Link href={url} target="_blank">
              Made with Resumade
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
