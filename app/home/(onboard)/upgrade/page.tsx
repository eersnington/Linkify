import OnboardUpgrade from '@/components/onboard/onboard-upgrade';

export default function Page({
  searchParams,
}: {
  searchParams: { email: string };
}) {
  const { email } = searchParams;
  return (
    <>
      <OnboardUpgrade emailAddress={email} />
    </>
  );
}
