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
import { ArrowRight, Pencil } from 'lucide-react';

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
      <main className="w-full lg:w-3/4 flex-1 overflow-hidden mx-4 my-4">
        <DashboardShell className="h-full rounded-lg bg-slate-50 p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between px-2">
            <div className="grid gap-1 text-center sm:text-left">
              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl text-purple-500">
                Choose your design
              </h1>
              <p className="text-base sm:text-lg text-purple-800">
                Customize your page and change your template anytime
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="lg:hidden border-purple-700 text-purple-950 mt-4 mb-2"
                  >
                    <Pencil className="h-5 w-5" /> Select a Template
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
                onClick={() => router.push('/upgrade?email=' + email)}
                className="bg-green-700 text-white md:animate-bounce "
              >
                Continue <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
          <div className="h-[calc(100%-4rem)] overflow-auto p-4">
            <DemoCanvas />
          </div>
        </DashboardShell>
      </main>
    </div>
  );
}
