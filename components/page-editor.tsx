"use client";

import { useThemeTemplate } from "@/context/editor-sidebar-context";

import { DashboardHeader } from "./dashboard/header";
import { DashboardShell } from "./dashboard/shell";
import { PageSidebar } from "./layout/page-sidebar";
import PageCanvas from "./page-canvas";
import { PublishDialog } from "./publish-dialog";

interface PageEditorProps {
  email: string;
}

export default function PageEditor({ email }: PageEditorProps) {
  const { selectedTemplate } = useThemeTemplate();

  return (
    <>
      <aside className="mr-4 w-1/4 overflow-auto">
        <PageSidebar email={email} />
      </aside>
      <main className="w-3/4 flex-1 overflow-hidden">
        <DashboardShell className="h-full rounded-lg bg-slate-50 p-4">
          <DashboardHeader heading="Page" text="Customize your webpage here">
            <PublishDialog email={email} selectedTemplate={selectedTemplate} />
          </DashboardHeader>
          <div className="h-[calc(100%-4rem)] overflow-auto p-4">
            <PageCanvas />
          </div>
        </DashboardShell>
      </main>
    </>
  );
}
