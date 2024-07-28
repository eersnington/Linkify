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
import { Upload } from 'lucide-react';
import { useState } from 'react';
import { processCV } from '@/actions/process-cv';
import Link from 'next/link';

const OnboardCard = ({
  profile,
  email,
}: {
  profile: LinkedInProfile;
  email: string;
}) => {
  const router = useRouter();
  const { updateLinkedInProfile } = useLinkedInData();
  const [isProcessing, setIsProcessing] = useState(false);

  const { firstName, lastName, photoUrl } = profile;

  const linkedInProfile = {
    id: 'anonymous',
    userEmail: email,
    ...profile,
  };

  const handleCVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      const formData = new FormData();
      formData.append('cv', file);
      formData.append('email', email);

      console.log('Uploading CV...');

      try {
        const result = await processCV(formData);

        console.log(result);
        if (result.data) {
          const cvProfile = {
            id: 'anonymous',
            userEmail: email,
            ...result.data,
          };
          console.log('Data saved');
          updateLinkedInProfile(cvProfile);
          router.push('/onboard/mypage?email=' + email);
        } else {
          // Handle error
          console.error(result.error);
        }
      } catch (error) {
        console.error('Error processing CV:', error);
      } finally {
        setIsProcessing(false);
      }
    }
  };

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
        <div className="mt-4">
          <Label className="text-lg text-purple-950">Or upload your CV:</Label>
          <div className="mt-2">
            <input
              type="file"
              accept=".pdf"
              onChange={handleCVUpload}
              className="hidden"
              id="cv-upload"
              disabled={isProcessing}
            />
            <label
              htmlFor="cv-upload"
              className="flex items-center justify-center px-4 py-2 border border-purple-700 rounded-md cursor-pointer hover:bg-purple-100"
            >
              <Upload className="mr-2" />
              {isProcessing ? 'Processing...' : 'Upload CV'}
            </label>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col">
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
              console.log(linkedInProfile);
              updateLinkedInProfile(linkedInProfile);
              router.push('/onboard/mypage?email=' + email);
            }}
          >
            Yes
          </Button>
        </div>
        {
          // on hover underline text
        }{' '}
        <Link
          href="/onboard/questions"
          className="text-sm text-slate-600 hover:underline  my-4"
        >
          I don&apos;t have a LinkedIn account
        </Link>
      </CardFooter>
    </Card>
  );
};

export default OnboardCard;
