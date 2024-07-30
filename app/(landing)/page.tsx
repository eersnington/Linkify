import { FAQ } from '@/components/sections/faq';
import { HeroLanding } from '@/components/sections/hero-landing';
import { BentoPrivacy } from '@/components/sections/privacy';
import { ThreeSteps } from '@/components/sections/three-steps';

export default async function IndexPage() {
  return (
    <>
      <HeroLanding />
      <ThreeSteps />
      <BentoPrivacy />
      <FAQ />
    </>
  );
}

