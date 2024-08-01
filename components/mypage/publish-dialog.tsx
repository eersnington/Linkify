'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { publishWebsite } from '@/actions/publish-website';
import { useUser } from '@clerk/nextjs';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import { CheckCircle, BookCheck, ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { env } from '@/env.mjs';
import { useSignupModal } from '@/hooks/use-signup-modal';
import { useLinkedInData } from '@/context/linkedin-data-context';
import { updateLinkedInProfile } from '@/actions/update-linkedin';
import Link from 'next/link';

const rootDomain = env.NEXT_PUBLIC_ROOT_DOMAIN;
const protocol = rootDomain === 'localhost:3000' ? `http://` : `https://`;

interface PublishDialogProps {
  email: string;
  selectedTemplate: number;
}

export function PublishDialog({ email, selectedTemplate }: PublishDialogProps) {
  const [domainName, setDomainName] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [open, setOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const signUpModal = useSignupModal();
  const { linkedInProfile } = useLinkedInData();

  const { isSignedIn } = useUser();
  const router = useRouter();

  const handlePublish = async () => {
    if (!isSignedIn) {
      setOpen(false);
      signUpModal.onOpen();
      return;
    } else {
      setIsPublishing(true);
      try {
        if (!linkedInProfile) {
          toast({
            title: 'Error',
            description:
              'You have no profile data. Please fetch your LinkedIn profile or upload your CV.',
            variant: 'destructive',
          });
        } else {
          await updateLinkedInProfile(email, linkedInProfile);
        }

        const result = await publishWebsite(
          email,
          domainName,
          selectedTemplate
        );

        if (result.status === 'success') {
          setOpen(false);
          setShowConfetti(true);
          toast({
            title: 'Your Page is Published 🎉🎉',
            description: `Link: ${protocol}${domainName}.${rootDomain}`,
            className: 'bg-green-500 text-white font-mono',
          });
          setTimeout(() => setShowConfetti(false), 7000); // Hide confetti after 7 seconds
          setSuccessDialogOpen(true); // Open the success dialog
        } else {
          toast({
            title: 'Error',
            description: result.error,
            variant: 'destructive',
          });
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to publish your page. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsPublishing(false);
      }
    }
  };

  return (
    <>
      {showConfetti && <Confetti />}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default" className="bg-blue-500">
            <BookCheck className="mr-2" />
            Publish
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-gradient_indigo-purple font-mono text-lg font-bold">
              You&apos;re almost there!
            </DialogTitle>
            <DialogDescription className="font-mono text-sm">
              Choose a domain name for your page. It will be accessible at{' '}
              <strong>{`your_name.${rootDomain}`}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="domain-name" className="text-right">
                Domain Name
              </Label>
              <Input
                id="domain-name"
                value={domainName}
                onChange={(e) => setDomainName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handlePublish}
              disabled={isPublishing}
              className="bg-green-500 text-white font-mono font-bold px-4 py-2 rounded-lg"
            >
              <BookCheck className="mr-2" />
              {isPublishing ? 'Publishing...' : 'Publish'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CheckCircle className="text-green-500 w-12 h-12 mx-auto" />
            </motion.div>
            <DialogTitle className="text-center text-xl font-bold">
              Congratulations! 🎉
            </DialogTitle>
            <DialogDescription className="text-center font-mono text-sm">
              Your domain{' '}
              <strong>
                {domainName}.{rootDomain}
              </strong>{' '}
              is now live at:
              <br />
              <Link
                href={`${protocol}${domainName}.${rootDomain}`}
                target="_blank"
                className="text-blue-500 hover:underline flex items-center justify-center mt-2"
              >
                {`${domainName}.${rootDomain}`}{' '}
                <ExternalLink className="ml-1" />
              </Link>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setSuccessDialogOpen(false)}
              className="bg-blue-500 text-white font-mono font-bold px-4 py-2 rounded-lg"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
