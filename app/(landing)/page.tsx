import { HeroLanding } from '@/components/sections/hero-landing';
import { PrivacySection } from '@/components/sections/privacy';
import { ThreeSteps } from '@/components/sections/three-steps';

export default async function IndexPage() {
  return (
    <>
      <HeroLanding />
      <ThreeSteps />
      <PrivacySection />
    </>
  );
}
