"use client";

import { useState } from "react";
import Link from "next/link";
import { UserSubscriptionPlan } from "@/types";

import { paymentSupport, pricingData } from "@/config/subscriptions";
import { cn } from "@/lib/utils";
import { useSigninModal } from "@/hooks/use-signin-modal";
import { Button, buttonVariants } from "@/components/ui/button";
import { BillingFormButton } from "@/components/forms/billing-form-button";
import { Icons } from "@/components/shared/icons";

import { SubscriptionPlan } from "../types/index";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

interface PricingCardsProps {
  userId?: string;
  subscriptionPlan?: UserSubscriptionPlan;
}

export function PricingCards({ userId, subscriptionPlan }: PricingCardsProps) {
  const isYearlyDefault =
    !subscriptionPlan?.stripeCustomerId || subscriptionPlan.interval === "year"
      ? true
      : false;
  const [isYearly, setIsYearly] = useState<boolean>(!!isYearlyDefault);
  const signInModal = useSigninModal();

  const toggleBilling = () => {
    setIsYearly(!isYearly);
  };

  const freePlan = pricingData.find((plan) => plan.title === "Standard");
  const paidPlan = pricingData.find((plan) => plan.title === "Premium");

  // const Noise = () => {
  //   return (
  //     <div
  //       className="absolute inset-0 h-full w-full scale-[1.2] opacity-10 [mask-image:radial-gradient(#fff,transparent,75%)]"
  //       style={{
  //         backgroundImage: "url(/images/noise.webp)",
  //         backgroundSize: "30%",
  //       }}
  //     ></div>
  //   );
  // };

  const PricingCard = ({
    offer,
    isPaid,
  }: {
    offer: SubscriptionPlan;
    isPaid: boolean;
  }) => {
    return (
      <div
        className={cn(
          "relative flex w-full max-w-2xl flex-col overflow-hidden rounded-3xl border text-white shadow-lg drop-shadow-lg",
          isPaid ? "border-2 bg-green-500" : "bg-purple-500"
        )}
        key={offer.title}
      >
        <div className="min-h-[180px] items-start space-y-6 p-8">
          <p className="text-muted-background flex font-urban text-xl font-bold tracking-wider">
            {offer.title}
          </p>

          <div className="flex flex-row">
            <div className="flex items-end">
              <div className="flex text-left text-5xl font-semibold leading-tight">
                {isPaid ? (
                  isYearly ? (
                    <>
                      <span className="text-muted-background/80 mr-3 line-through">
                        ${offer.prices.monthly}
                      </span>
                      <span>${offer.prices.yearly}</span>
                    </>
                  ) : (
                    `$${offer.prices.monthly}`
                  )
                ) : (
                  "Free"
                )}
              </div>
              {isPaid && (
                <div className="text-muted-background -mb-1 ml-3 text-left text-xl font-medium">
                  <div>/month</div>
                </div>
              )}
            </div>
          </div>
          {isPaid ? (
            <div className="text-muted-background text-left text-lg">
              {isYearly
                ? `$${offer.prices.yearly * 12} will be charged when annual`
                : "when charged monthly"}
            </div>
          ) : (
            <div className="text-muted-background text-left text-lg">
              Lifetime Free
            </div>
          )}
        </div>

        <div className="flex h-full flex-col justify-between gap-16 p-8">
          <ul className="space-y-4 text-left text-lg font-medium leading-normal">
            {offer.benefits.map((feature) => (
              <li className="flex items-start gap-x-4" key={feature}>
                <Icons.check className="size-6 shrink-0 font-semibold text-white" />
                <p>{feature}</p>
              </li>
            ))}
          </ul>

          {userId && subscriptionPlan ? (
            offer.title === "Standard" ? (
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "lg",
                    rounded: "full",
                  }),
                  "w-full bg-purple-500 text-sm font-semibold text-white"
                )}
              >
                Go to dashboard
              </Link>
            ) : (
              <BillingFormButton
                year={isYearly}
                offer={offer}
                subscriptionPlan={subscriptionPlan}
              />
            )
          ) : (
            <Button
              variant={"outline"}
              size="lg"
              onClick={signInModal.onOpen}
              className={cn(
                "bg-white text-lg font-semibold text-black/80 rounded-full",
                isPaid ? "hover:bg-green-500" : "hover:bg-purple-500"
              )}
            >
              Sign in
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="container flex flex-col items-center text-center">
      <h1 className="font-heading text-3xl md:text-6xl">{"Pricing"}</h1>

      <div className="mb-4 mt-10 flex items-center gap-5">
        <ToggleGroup
          type="single"
          size="sm"
          defaultValue={isYearly ? "yearly" : "monthly"}
          onValueChange={toggleBilling}
          aria-label="toggle-year"
          className="h-9 overflow-hidden rounded-full border bg-background p-1 *:h-7 *:text-muted-foreground"
        >
          <ToggleGroupItem
            value="yearly"
            className="rounded-full px-5 data-[state=on]:!bg-primary data-[state=on]:!text-primary-foreground"
            aria-label="Toggle yearly billing"
          >
            Yearly (-20%)
          </ToggleGroupItem>
          <ToggleGroupItem
            value="monthly"
            className="rounded-full px-5 data-[state=on]:!bg-primary data-[state=on]:!text-primary-foreground"
            aria-label="Toggle monthly billing"
          >
            Monthly
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 bg-inherit py-8 md:grid-cols-2">
        {freePlan && <PricingCard offer={freePlan} isPaid={false} />}
        {paidPlan && <PricingCard offer={paidPlan} isPaid={true} />}
      </div>

      <p className="mt-3 text-balance text-center text-base text-muted-foreground">
        Email{" "}
        <a
          className="font-medium text-primary hover:underline"
          href={`mailto:${paymentSupport.email}`}
        >
          {paymentSupport.email}
        </a>{" "}
        for to contact our support team.
        <br />
        <strong>{paymentSupport.message2} </strong>
      </p>
    </section>
  );
}
