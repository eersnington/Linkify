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
import { useLinkedInData } from '@/context/linkedin-data-context';
import { ArrowRight, Upload } from 'lucide-react';
import { useState } from 'react';
import { processCV } from '@/actions/process-cv';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Link from 'next/link';
import { LinkedInProfile } from '@prisma/client';

// New CV Upload Button Component
const CVUploadButton = ({
  email,
  onUpload,
}: {
  email: string;
  onUpload: () => void;
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

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
          onUpload();
        } else {
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
    <div className="mt-4">
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
  );
};

const OnboardCard = ({
  profile,
  email,
}: {
  profile: LinkedInProfile;
  email: string;
}) => {
  const router = useRouter();
  const { updateLinkedInProfile } = useLinkedInData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { firstName, lastName, photoUrl } = profile;

  const linkedInProfile = {
    ...profile,
  };

  const handleCVUploadSuccess = () => {
    updateLinkedInProfile({
      ...linkedInProfile,
    });
    router.push('/onboard/mypage?email=' + email);
  };

  const handleNoClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
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
        <CardFooter className="flex-col">
          <div className="flex w-full justify-center gap-14">
            <Button
              variant="outline"
              onClick={handleNoClick}
              className="border-purple-700 text-purple-950"
            >
              No, that&apos;s not me
            </Button>
            <Button
              className="bg-purple-500"
              onClick={() => {
                console.log(linkedInProfile);
                updateLinkedInProfile(linkedInProfile);
                router.push('/onboard/mypage?email=' + email);
              }}
            >
              Yes <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
          <CVUploadButton email={email} onUpload={handleCVUploadSuccess} />
          <Link
            href="/onboard/questions"
            className="hidden text-sm text-slate-600 hover:underline my-4"
          >
            I don&apos;t have a LinkedIn account
          </Link>
        </CardFooter>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white border-2 border-purple-700">
          <DialogHeader>
            <DialogTitle className="text-purple-950 text-xl font-semibold inline-flex items-center">
              <LinkedInLogoIcon className="mr-2 text-purple-700" />
              LinkedIn Email Recommendation
            </DialogTitle>
            <DialogDescription className="text-gray-800 text-base">
              We recommend signing up using the same email address that you use
              on LinkedIn, so we can automatically pull your details from your
              profile.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                setIsDialogOpen(false);
                router.push('/');
              }}
              className="bg-purple-500 hover:bg-purple-600 text-white"
            >
              Understood
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OnboardCard;
