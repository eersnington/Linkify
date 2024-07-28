'use client';

import { useState } from 'react';
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

interface PageEditorProps {
  isUserPremium: boolean;
}

export default function PageEditor({ isUserPremium }: PageEditorProps) {
  const [open, setOpen] = useState(false);

  const { selectedTemplate } = useThemeTemplate();
  const { user } = useUser();

  const email = user?.emailAddresses[0].emailAddress || 'example@email.com';

  return (
    <div className="flex h-full w-full">
      <aside className="hidden lg:block w-1/4 overflow-auto ml-4 my-4">
        <PageSidebar isUserPremium={isUserPremium} />
      </aside>
      <main className="w-full lg:w-3/4 flex-1 overflow-hidden mx-4 my-4 ">
        <DashboardShell className="h-full rounded-lg bg-slate-50 p-4">
          <DashboardHeader
            heading="Editor"
            text="Customise your page and change templates any time"
          >
            <div className="flex items-center space-x-2">
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
              <PublishDialog
                email={email}
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
