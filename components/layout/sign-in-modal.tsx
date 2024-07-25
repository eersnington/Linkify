"use client";

import { useState } from "react";
import { SignInButton, SignUp } from "@clerk/nextjs";

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
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg text-center">
        <div className="p-6">
          <div className="text-gradient_indigo-purple font-mono text-lg font-bold mb-4">
            You&apos;re almost there!
          </div>
          <div className="mb-6 text-gray-700">
            You need to be signed in to update your profile.
          </div>
          <SignUp />
        </div>
      </div>
    </Modal>
  );
};
