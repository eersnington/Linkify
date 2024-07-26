'use client';

import { useThemeTemplate } from '@/context/editor-sidebar-context';

import { useLinkedInData } from '@/context/linkedin-data-context';
import { DemoSidebar } from './onboard-sidebar';
import { DashboardShell } from '../dashboard/shell';
import { DashboardHeader } from '../dashboard/header';
import { PublishDialog } from '../publish-dialog';
import { DemoCanvas } from './onboard-canvas';

interface PageEditorProps {
  email: string;
}

export default function OnboardEditor({ email }: PageEditorProps) {
    const { selectedTemplate } = useThemeTemplate();

  return (
    <>
      <aside className="mr-4 w-1/4 overflow-auto">
        <DemoSidebar email={email} />
      </aside>
      <main className="w-3/4 flex-1 overflow-hidden">
        <DashboardShell className="h-full rounded-lg bg-slate-50 p-4">
          <DashboardHeader heading="Page" text="Customize your webpage here">
            <PublishDialog email={email} selectedTemplate={selectedTemplate} />
          </DashboardHeader>
          <div className="h-[calc(100%-4rem)] overflow-auto p-4">
            <DemoCanvas />
          </div>
        </DashboardShell>
      </main>
    </>
  );
}
