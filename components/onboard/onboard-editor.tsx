'use client';

import { useState } from 'react';
import { useThemeTemplate } from '@/context/editor-sidebar-context';
import { DemoSidebar } from './onboard-sidebar';
import { DashboardShell } from '../dashboard/shell';
import { DashboardHeader } from '../dashboard/header';
import { useRouter } from 'next/navigation';

import { DemoCanvas } from './onboard-canvas';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Pencil } from 'lucide-react';

interface PageEditorProps {
  email: string;
}

export default function OnboardEditor({ email }: PageEditorProps) {
  const { selectedTemplate } = useThemeTemplate();
  const [open, setOpen] = useState(false);

  const router = useRouter();

  return (
    <div className="flex h-full w-full">
      <aside className="hidden lg:block w-1/4 overflow-auto ml-4 my-4">
        <DemoSidebar email={email} />
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
                  <DemoSidebar email={email} />
                </SheetContent>
              </Sheet>
              <Button
                variant={'default'}
                onClick={() => router.push('/onboard/upgrade?email=' + email)}
                className="bg-purple-700 text-white"
              >
                Continue
              </Button>
            </div>
          </DashboardHeader>
          <div className="h-[calc(100%-4rem)] overflow-auto p-4">
            <DemoCanvas />
          </div>
        </DashboardShell>
      </main>
    </div>
  );
}
