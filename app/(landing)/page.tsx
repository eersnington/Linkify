import { FeatureSection } from "@/components/sections/components/features";
import { HeroLanding } from "@/components/sections/hero-landing";

export default async function IndexPage() {
  return (
    <>
      <HeroLanding />
      <FeatureSection />
    </>
  );
}
