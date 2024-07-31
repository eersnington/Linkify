import { ThemeTemplateProvider } from '@/context/editor-sidebar-context';
import { LinkedInDataProvider } from '@/context/linkedin-data-context';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function PageLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen w-full">
      <div className="flex-1 w-full">
        <ThemeTemplateProvider>
          <LinkedInDataProvider>{children}</LinkedInDataProvider>
        </ThemeTemplateProvider>
      </div>
    </div>
  );
}
