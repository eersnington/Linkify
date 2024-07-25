import { Metadata } from "next";
import { currentUser } from '@clerk/nextjs/server';

import { cn } from "@/lib/utils";
import { pf_display } from "@/app/fonts";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";

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

    if (user){
        redirect("/dashboard");
    }

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
        <Card className="mx-auto w-full max-w-md border-2 border-slate-900 drop-shadow-xl">
      <CardHeader>
        <CardTitle>Error</CardTitle>
        <CardDescription>
          Please verify the following information to continue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center space-y-4 ">
                   <div className="space-y-2">
            <Label className="text-lg">We couldn&apos;t find a LinkedIn account associated to {" "}{email}</Label>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-center gap-14">
          <Link
          href={"/"}
          className="bg-black rounded-lg text-base hover:bg-black/80 text-white px-4 py-2 font-bold">
            {"Try Again?"}
          </Link>
        </div>
      </CardFooter>
    </Card>
      </div>
    </div>
  );
}
