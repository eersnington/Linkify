import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardShell } from '@/components/dashboard/shell';
import { Button } from '@/components/ui/button';

export default function OnboardEditorLoading() {
  return (
    <div className="flex h-full w-full">
      <div className="h-[calc(100%-4rem)] overflow-auto p-4">
        <div className="h-full bg-slate-100 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
}
