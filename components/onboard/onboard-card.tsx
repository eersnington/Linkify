'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { LinkedInLogoIcon } from '@radix-ui/react-icons';
import { LinkedInProfile } from '@/types/linkedin';
import { useLinkedInData } from '@/context/linkedin-data-context';

const OnboardCard = ({
  profile,
  email,
}: {
  profile: LinkedInProfile;
  email: string;
}) => {
  const router = useRouter();
  const { updateLinkedInProfile } = useLinkedInData();

  const { firstName, lastName, photoUrl } = profile;
  updateLinkedInProfile(profile);

  return (
    <Card className="mx-auto w-full max-w-md border-2 border-purple-700 drop-shadow-xl">
      <CardHeader className="text-purple-950">
        <CardTitle className="flex items-center justify-center space-x-2">
          <LinkedInLogoIcon className="text-purple-700" />
          <span>User Information</span>
        </CardTitle>
        <CardDescription>
          Please verify the following information to continue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center space-y-4">
          <Image
            src={photoUrl}
            alt={firstName}
            width={128}
            height={128}
            className="rounded-lg ring-2 ring-purple-700"
          />
          <Badge className="bg-yellow-500">{`${firstName} ${lastName}`}</Badge>
          <Label className="text-purple-950">{email}</Label>
          <div className="space-y-2">
            <Label className="text-lg text-purple-950">
              Is this your LinkedIn account?
            </Label>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-center gap-14">
          <Button
            variant="outline"
            onClick={() => {
              router.push('/');
            }}
            className="border-purple-700 text-purple-950"
          >
            No, that&apos;s not me
          </Button>
          <Button
            className="bg-yellow-500"
            onClick={() => {
              router.push('/onboard/mypage?email=' + email);
            }}
          >
            Yes
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default OnboardCard;
