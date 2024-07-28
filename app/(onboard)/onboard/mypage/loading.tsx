import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardShell } from '@/components/dashboard/shell';
import { Button } from '@/components/ui/button';

export default function OnboardEditorLoading() {
  return (
    <div className="flex h-full w-full">
      <aside className="hidden lg:block w-1/4 overflow-auto ml-4 my-4">
        <div className="h-full bg-slate-100 rounded-lg animate-pulse"></div>
      </aside>
      <main className="w-full lg:w-3/4 flex-1 overflow-hidden mx-4 my-4">
        <DashboardShell className="h-full rounded-lg bg-slate-50 p-4">
          <DashboardHeader
            heading="Editor"
            text="Customise your page and change templates any time"
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-md bg-slate-200 animate-pulse lg:hidden"></div>
              <Button
                variant={'default'}
                className="bg-purple-700 text-white opacity-50 cursor-not-allowed"
                disabled
              >
                Continue
              </Button>
            </div>
          </DashboardHeader>
          <div className="h-[calc(100%-4rem)] overflow-auto p-4">
            <div className="h-full bg-slate-100 rounded-lg animate-pulse"></div>
          </div>
        </DashboardShell>
      </main>
    </div>
  );
}
