import { Metadata } from "next";
import { getLinkedInProfile } from "@/actions/get-linkedin-profile";

import { cn } from "@/lib/utils";
import OnboardCard from "@/components/onboard-card";
import { pf_display } from "@/app/fonts";

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

  const formdata = {
    email: email,
  };

  const response = await getLinkedInProfile(formdata);

  const { status, message, data } = response;
  const name = data?.firstName + " " + data?.lastName;
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
          email={searchParams.email}
          name={name}
          imageUrl={imageUrl}
        />
      </div>
    </div>
  );
}
