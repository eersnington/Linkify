// pages/onboard/mypage.tsx

export const maxDuration = 30;

import { redirect } from "next/navigation";
import { getStoredProfile } from "@/actions/get-linkedin-profile";
import { LinkedInProfileProvider } from "@/context/linkedin-profile-context";

import PageEditor from "@/components/page-editor";

export const metadata = {
  title: "Onboarding | My Page",
  description: "Customize your webpage here",
};

export default async function MyPage({
  searchParams,
}: {
  searchParams: { email: string };
}) {
  const { email } = searchParams;

  if (!email) {
    redirect("/");
  }

  const { status, data } = await getStoredProfile(email); // data is the LinkedInProfile object

  if (!data) {
    redirect("/onboard?email=" + email); // redirect to the onboard page if no data is found
  }

  return (
    <LinkedInProfileProvider initialProfile={data}>
      <div className="flex h-full flex-1 bg-gradient-to-r from-indigo-500 via-indigo-400 to-indigo-500 p-4">
        <PageEditor email={email} />
      </div>
    </LinkedInProfileProvider>
  );
}
