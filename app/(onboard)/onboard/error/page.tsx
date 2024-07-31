import { Metadata } from 'next';
import { currentUser } from '@clerk/nextjs/server';
import { LinkedInLogoIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { pf_display } from '@/app/fonts';
import { redirect } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import UploadCVButton from '@/components/upload-cv-button';

export const metadata: Metadata = {
  title: 'Onboard',
  description: 'Onboarding of Linkify',
};

export default async function OnboardPage({
  searchParams,
}: {
  searchParams: {
    email: string;
    err?: string;
  };
}) {
  const { email, err } = searchParams;

  const user = await currentUser();

  if (user) {
    redirect('/dashboard');
  }

  if (email === 'undefined' || !email) {
    redirect('/');
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-12 px-4 text-center">
      <div className="w-full max-w-md">
        <Card className="mx-auto w-full max-w-md border-2 border-purple-700 drop-shadow-xl">
          <CardHeader className="text-purple-950">
            <CardTitle className="flex items-center justify-center space-x-2">
              <LinkedInLogoIcon className="text-purple-700" />
              Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-4 ">
              <div className="space-y-2">
                {err === 'exists' ? (
                  <Label className="text-lg  text-purple-950">
                    An account is already associated to this email: {email}
                  </Label>
                ) : (
                  <Label className="text-lg  text-purple-950">
                    We couldn&apos;t find a LinkedIn account associated to{' '}
                    {email}
                  </Label>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col w-full justify-center gap-2">
              <Link
                href={'/'}
                className="bg-yellow-500 rounded-lg text-base hover:bg-purple-700 text-white px-4 py-2 font-bold"
              >
                {'Try Again?'}
              </Link>
              <UploadCVButton email={email} />
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
