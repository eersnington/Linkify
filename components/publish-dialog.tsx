"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { publishWebsite } from "@/actions/publish-website";
import { useUser } from "@clerk/nextjs";
import Confetti from "react-confetti";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { env } from "@/env.mjs"
import { useSigninModal } from "@/hooks/use-signin-modal";

const url = env.NEXT_PUBLIC_APP_URL

interface PublishDialogProps {
  email: string;
  selectedTemplate: number;
}

export function PublishDialog({ email, selectedTemplate }: PublishDialogProps) {
  const [domainName, setDomainName] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [open, setOpen] = useState(false);
  const signUpModal = useSigninModal();
  
  const { isSignedIn } = useUser(); // Use the useUser hook to get user info
  const router = useRouter();

  const handlePublish = async () => {
    if (!isSignedIn) {
      setOpen(false);

      signUpModal.onOpen();
      return;
    } else {
      setIsPublishing(true);
      try {
        const result = await publishWebsite(
          email,
          domainName,
          selectedTemplate,
        );

        if (result.status === "success") {
          setOpen(false);
          setShowConfetti(true);
          toast({
            title: "Success",
            description: `Your page has been published at ${url}/${domainName} 🎉`,
            className: "bg-green-500 text-white font-mono",
          });
          setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 5 seconds
        } else {
          toast({
            title: "Error",
            description: result.error,
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to publish your page. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsPublishing(false);
      }
    }
  };

  const handleSignupRedirect = () => {
    router.push("/signup");
  };

  return (
    <>
      {showConfetti && <Confetti />}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default" className="bg-purple-950">
            Publish
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-gradient_indigo-purple font-mono text-lg font-bold">
              You&apos;re almost there!
            </DialogTitle>
            <DialogDescription className="font-mono text-sm">
              Choose a domain name for your page. It will be accessible at{" "}
              <strong>linkify.com/your_domain</strong>
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
              className="bg-purple-950 hover:bg-purple-700 text-white font-mono font-bold px-4 py-2 rounded-lg"
            >
              {isPublishing ? "Publishing..." : "Publish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
