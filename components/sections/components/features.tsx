"use client";

import React from "react";
import {
  BarChart,
  FileCode,
  Globe,
  Lock,
  Shield,
  WandSparkles,
} from "lucide-react";

import { WobbleCard } from "@/components/ui/wobble-card";

export function FeatureSection() {
  return (
    <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-16 sm:py-20">
      <div className="container mx-auto max-w-7xl">
        <h2 className="mb-10 text-center text-4xl font-bold text-white md:text-6xl">
          Features
        </h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <WobbleCard containerClassName="col-span-1 lg:col-span-2 bg-gradient-to-br from-pink-500 to-pink-700 min-h-[300px]">
            <div className="max-w-xs">
              <FileCode className="mb-4 size-8 text-white" />
              <h3 className="mb-2 text-left text-xl font-semibold tracking-[-0.015em] text-white lg:text-2xl">
                Premium Templates
              </h3>
              <p className="text-left text-base text-neutral-200">
                Access to high-quality, professionally designed templates for
                your website.
              </p>
            </div>
          </WobbleCard>

          <WobbleCard containerClassName="col-span-1 bg-gradient-to-br from-sky-400 to-sky-600 min-h-[300px]">
            <Lock className="mb-4 size-8 text-white" />
            <h3 className="mb-2 text-left text-xl font-semibold tracking-[-0.015em] text-white">
              SSL Certificate
            </h3>
            <p className="text-left text-base text-neutral-200">
              Ensure your website is secure with an SSL certificate.
            </p>
          </WobbleCard>

          <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-gradient-to-br from-emerald-400 to-emerald-600 min-h-[200px] lg:min-h-[250px]">
            <div className="max-w-sm">
              <Globe className="mb-4 size-8 text-white" />
              <h3 className="mb-2 text-left text-xl font-semibold tracking-[-0.015em] text-white lg:text-2xl">
                Free Custom Domain
              </h3>
              <p className="text-left text-base text-neutral-200">
                Get a custom domain name for your website, enhancing your
                brand&apos;s online presence.
              </p>
            </div>
          </WobbleCard>

          <WobbleCard containerClassName="col-span-1 lg:col-span-2 bg-gradient-to-br from-yellow-400 to-yellow-600 min-h-[250px]">
            <div className="max-w-xs">
              <BarChart className="mb-4 size-8 text-white" />
              <h3 className="mb-2 text-left text-xl font-semibold tracking-[-0.015em] text-white lg:text-2xl">
                Web Analytics
              </h3>
              <p className="text-left text-base text-neutral-200">
                Track and analyze your website&apos;s performance with advanced
                analytics tools.
              </p>
            </div>
          </WobbleCard>

          <WobbleCard containerClassName="col-span-1 bg-gradient-to-br from-rose-400 to-rose-600 min-h-[250px]">
            <Shield className="mb-4 size-8 text-white" />
            <h3 className="mb-2 text-left text-xl font-semibold tracking-[-0.015em] text-white">
              Priority Support
            </h3>
            <p className="text-left text-base text-neutral-200">
              Get priority customer support for any issues you may encounter.
            </p>
          </WobbleCard>
        </div>
      </div>
    </section>
  );
}
