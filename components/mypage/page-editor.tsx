'use client';

import { useEffect, useState } from 'react';
import { useThemeTemplate } from '@/context/editor-sidebar-context';
import { useUser } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Pencil } from 'lucide-react';
import { DashboardHeader } from '../dashboard/header';
import { DashboardShell } from '../dashboard/shell';
import { PublishDialog } from './publish-dialog';
import { PageCanvas } from './page-canvas';
import { PageSidebar } from './page-sidebar';
import { EnhanceContentButton } from '../ehance-button';
import { LinkedInProfile } from '@prisma/client';
import { useLinkedInData } from '@/context/linkedin-data-context';
import { Dialog, DialogContent } from '../ui/dialog';
import { UpgradeCard } from '../upgrade-card';
import { useChangesMade } from '@/context/changes-made-context';

interface PageEditorProps {
  isUserPremium: boolean;
  profileData: LinkedInProfile | null;
}

export default function PageEditor({
  isUserPremium,
  profileData,
}: PageEditorProps) {
  const [open, setOpen] = useState(false);
  const { linkedInProfile, updateLinkedInProfile } = useLinkedInData();
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [hasShownDialog, setHasShownDialog] = useState(false);

  const { changesMade } = useChangesMade();

  const { selectedTemplate } = useThemeTemplate();
  const { user } = useUser();

  const email = user?.emailAddresses[0].emailAddress || 'example@email.com';

  useEffect(() => {
    if (!isUserPremium && !hasShownDialog) {
      setShowUpgradeDialog(true);
      setHasShownDialog(true);
    }

    async function loadProfile() {
      try {
        if (!linkedInProfile && profileData) {
          console.log('Updating LinkedIn profile with fetched data');
          updateLinkedInProfile(profileData);
          return;
        }
        console.log('LinkedIn Profile exists in Context');
      } catch (err) {
        console.error(
          err instanceof Error ? err.message : 'An unknown error occurred'
        );
      }
    }

    loadProfile();
  }, [
    profileData,
    linkedInProfile,
    updateLinkedInProfile,
    isUserPremium,
    hasShownDialog,
  ]);

  return (
    <div className="flex h-full w-full">
      <Dialog
        open={showUpgradeDialog}
        onOpenChange={(open) => {
          setShowUpgradeDialog(open);
          if (!open) setHasShownDialog(true);
        }}
      >
        <DialogContent>
          <UpgradeCard
            title="Unlock premium templates to boost your career!"
            border
            sparkle={false}
          />
        </DialogContent>
      </Dialog>
      <aside className="hidden lg:block w-1/4 overflow-auto ml-4 my-4">
        <PageSidebar isUserPremium={isUserPremium} />
      </aside>
      <main className="w-full lg:w-3/4 flex-1 overflow-hidden mx-4 my-4 ">
        <DashboardShell className="h-full rounded-lg bg-slate-50 p-4">
          <DashboardHeader heading="Editor" text="">
            <div className="flex items-center space-x-2">
              {changesMade && (
                <span className="text-red-700">Publish to save changes</span>
              )}
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="lg:hidden border-purple-700 text-purple-950"
                  >
                    <Pencil className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-[300px] sm:w-[400px] bg-slate-200"
                >
                  <PageSidebar isUserPremium={isUserPremium} />
                </SheetContent>
              </Sheet>
              <EnhanceContentButton />
              <PublishDialog
                email={email}
                isPremium={isUserPremium}
                selectedTemplate={selectedTemplate}
              />
            </div>
          </DashboardHeader>
          <div className="h-[calc(100%-4rem)] overflow-auto p-4">
            <PageCanvas />
          </div>
        </DashboardShell>
      </main>
    </div>
  );
}
