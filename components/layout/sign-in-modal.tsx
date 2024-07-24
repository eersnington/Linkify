"use client";

import { useState } from "react";
import { SignInButton } from "@clerk/nextjs";

import { siteConfig } from "@/config/site";
import { useSigninModal } from "@/hooks/use-signin-modal";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import { Modal } from "@/components/shared/modal";

import Logo from "../shared/logo";

export const SignInModal = () => {
  const signInModal = useSigninModal();
  const [signInClicked, setSignInClicked] = useState(false);

  return (
    <Modal showModal={signInModal.isOpen} setShowModal={signInModal.onClose}>
      <div className="w-full">
        <div className="flex flex-col items-center justify-center space-y-3 border-b bg-background px-4 py-6 pt-8 text-center md:px-16">
          <a href={siteConfig.url}>
            <Logo className="size-10" />
          </a>
          <h3 className="font-urban text-2xl font-bold">Sign In</h3>
          <p className="text-sm text-gray-500">
            This is strictly for demo purposes - only your email and profile
            picture will be stored.
          </p>
        </div>

        <div className="flex flex-col space-y-4 bg-secondary/50 px-4 py-8 md:px-16">
          <SignInButton />
        </div>
      </div>
    </Modal>
  );
};
