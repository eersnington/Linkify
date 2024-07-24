import { ThemeTemplateProvider } from "@/context/editor-sidebar-context";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function PageLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex-1 overflow-hidden">
        <ThemeTemplateProvider>{children}</ThemeTemplateProvider>
      </div>
    </div>
  );
}
