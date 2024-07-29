import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { LoaderIcon } from 'lucide-react';
import { LinkedInLogoIcon } from '@radix-ui/react-icons';

export default function Loading() {
  return (
    <div className="flex flex-col h-screen items-center justify-center space-y-12 px-4 text-center">
      <div className="w-full max-w-md">
        <Card className="mx-auto w-full max-w-md border-2 border-purple-700 drop-shadow-xl">
          <CardHeader className="text-purple-950">
            <CardTitle className="flex items-center justify-center space-x-2">
              <LinkedInLogoIcon className="animate-bounce text-purple-700" />
              <span>User Information</span>
            </CardTitle>
            <CardDescription>
              We&apos;re fetching your LinkedIn profile. Please wait...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mx-auto my-4 flex w-full flex-col items-center gap-5">
              <LoaderIcon className="animate-spin text-purple-700" size={48} />
              <Skeleton className="mb-2 h-4 w-1/12 bg-yellow-500" />
              <Skeleton className="h-10 w-2/6 bg-purple-950" />
              <Skeleton className="mb-3 mt-5 h-8 w-1/5 bg-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
