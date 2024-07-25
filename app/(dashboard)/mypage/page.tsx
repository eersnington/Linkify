// pages/dashboard/page.tsx

import { redirect } from "next/navigation";
import { getStoredProfile } from "@/actions/get-linkedin-profile";
import { LinkedInProfileProvider } from "@/context/linkedin-profile-context";
import { currentUser } from "@clerk/nextjs/server";

import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { PageSidebar } from "@/components/layout/page-sidebar";
import PageCanvas from "@/components/page-canvas";
import PageEditor from "@/components/page-editor";

export const metadata = {
  title: "My Page",
  description: "Customize your webpage here",
};

export default async function MyPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/login");
  }

  const email = user.emailAddresses[0].emailAddress;

  const { status, data } = await getStoredProfile(email); // data is the LinkedInProfile object

  if (!data) {
    redirect("/onboard?email=" + email); // redirect to the onboard page if no data is found
  }

  return (
    <LinkedInProfileProvider initialProfile={data}>
      <div className="flex h-full flex-1 bg-purple-950 p-4">
        <PageEditor email={email} />
      </div>
    </LinkedInProfileProvider>
  );
}
