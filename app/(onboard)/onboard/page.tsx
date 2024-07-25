import { Metadata } from "next";
import { fetchLinkedInProfile } from "@/actions/get-linkedin-profile";
import { currentUser } from '@clerk/nextjs/server';

import { cn } from "@/lib/utils";
import OnboardCard from "@/components/onboard-card";
import { pf_display } from "@/app/fonts";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Onboard",
  description: "Onboarding of Linkify",
};

export default async function OnboardPage({
  searchParams,
}: {
  searchParams: {
    email: string;
  };
}) {
  const { email } = searchParams;

  const user = await currentUser();

  const emailStr = user?.emailAddresses[0].emailAddress || email;

  const formdata = {
    email: emailStr,
  };

  const response = await fetchLinkedInProfile(formdata);

  const { status, message, data } = response;

  if (status === "error") {
    return redirect("/onboard/error?email=" + emailStr);
  }

  const name = data?.fullName || "John Doe";
  const imageUrl = data?.photoUrl || "/images/placeholder.jpg";

  return (
    <div className="flex flex-col items-center justify-center space-y-12 px-4 text-center">
      <div className="mx-auto max-w-2xl">
        <div
          className={cn(
            "text-5xl font-bold leading-snug text-slate-200",
            pf_display.className,
          )}
        >
          {"“I setup a portfolio in 5 minutes with Linkify."}
          <br />
          {"It was so easy!” "}
          <span className="mt-4 font-mono text-xl font-bold text-slate-900">
            - Our users
          </span>
        </div>
      </div>
      <div className="w-full max-w-md">
        <OnboardCard
          email={emailStr}
          name={name}
          imageUrl={imageUrl}
        />
      </div>
    </div>
  );
}
