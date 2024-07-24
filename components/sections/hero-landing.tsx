import Link from "next/link";

import { heroLanding } from "@/config/landing";
import { cn, nFormatter } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";

import { CTAForm } from "../forms/cta-email-form";

/*
  This component is the Hero Section of the landing page.
  Your website header line and the main call to action button is placed here.
  Make sure to put careful thought into the one-liner header and the sub-header text.
*/

export function HeroLanding() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
      <div className="container flex max-w-5xl flex-col items-center gap-8 py-16 text-center sm:py-20">
        <h1 className="text-balance font-urban text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[66px]">
          {"Create a Stunning Portfolio from LinkedIn"}{" "}
          <span className="text-gradient_indigo-purple font-extrabold">
            {"in Minutes"}
          </span>
        </h1>

        <p
          className="max-w-2xl text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8"
          style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
        >
          {
            "Convert Your LinkedIn Profile into a Beautiful Personal Website with Ease"
          }
        </p>

        {/*
          Call To Action buttons are below
          You can add more buttons or change the text of the buttons
        */}
        <div
          className="flex w-full flex-col items-center justify-center sm:w-9/12"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          <div className="flex w-full justify-center">
            <CTAForm />
          </div>
        </div>
      </div>
    </section>
  );
}
