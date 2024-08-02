import { HeroLanding } from '@/components/sections/hero-landing';
import { ThreeSteps } from '@/components/sections/three-steps';

export default async function IndexPage() {
  return (
    <>
      <HeroLanding />
      <ThreeSteps />
      {/* <BentoPrivacy />
      <FAQ /> */}
    </>
  );
}
