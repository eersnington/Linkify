import {
  paymentSupportConfig,
  pricingFaqConfig,
  SubscriptionPlan,
} from "types";
import { env } from "@/env.mjs";

export const paymentSupport: paymentSupportConfig = {
  email: "support@supportemail.com",
  message1:
    "If you have any questions or need assistance, please don't hesitate to contact us.", // There is another one in pricing-faq.tsx
  message2: "We're here to help!",
};

export const pricingData: SubscriptionPlan[] = [
  {
    title: "Standard",
    description:
      "Unlock premium templates, unlimited AI generated content, web analytics and a free custom domain with our Premium plan!", // this will be showed in the billing page if they are subscribed to this plan
    benefits: [
      "Standard templates",
      "SSL certificate",
      "Limited AI generated content",
      "Connect your existing domain",
    ],
    limitations: [],
    prices: {
      monthly: 0,
      yearly: 0,
    },
    stripeIds: {
      monthly: "none",
      yearly: "none",
    },
  },
  {
    title: "Premium",
    description:
      "You have access to premium templates, unlimited AI generated content, web analytics and a free custom domain!", // this will be showed in the billing page if they are subscribed to this plan
    benefits: [
      "Premium templates",
      "SSL certificate",
      "Unlimited AI generated content",
      "Free custom domain",
      "Webpage analytics",
      "Priority customer support",
      "No custom Linkify branding",
    ],
    limitations: [],
    prices: {
      monthly: 10,
      yearly: 8,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID,
    },
  },
];

export const pricingFaqData: pricingFaqConfig[] = [
  {
    id: "item-1",
    question: "What is the cost of the free plan?",
    answer:
      "Our free plan is completely free, with no monthly or annual charges. It's a great way to get started and explore our basic features.",
  },
  {
    id: "item-2",
    question: "How much does the Basic Monthly plan cost?",
    answer:
      "The Basic Monthly plan is priced at $15 per month. It provides access to our core features and is billed on a monthly basis.",
  },
  {
    id: "item-3",
    question: "What is the price of the Pro Monthly plan?",
    answer:
      "The Pro Monthly plan is available for $25 per month. It offers advanced features and is billed on a monthly basis for added flexibility.",
  },
  {
    id: "item-4",
    question: "Do you offer any annual subscription plans?",
    answer:
      "Yes, we offer annual subscription plans for even more savings. The Basic Annual plan is $144 per year, and the Pro Annual plan is $300 per year.",
  },
  {
    id: "item-5",
    question: "Is there a trial period for the paid plans?",
    answer:
      "We offer a 14-day free trial for both the Pro Monthly and Pro Annual plans. It's a great way to experience all the features before committing to a paid subscription.",
  },
];
