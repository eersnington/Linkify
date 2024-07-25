"use client";

import { useState } from "react";
import { SignUp } from "@clerk/nextjs";

import { useSigninModal } from "@/hooks/use-signin-modal";
import { Modal } from "@/components/shared/modal";


export const SignUpModal = () => {
  const signInModal = useSigninModal();
  const [signInClicked, setSignInClicked] = useState(false);

  return (
    <Modal showModal={signInModal.isOpen} setShowModal={signInModal.onClose}>
      <div className="w-full">
        <div className="text-gradient_indigo-purple font-mono text-lg font-bold">
          You&apos;re almost there!
          </div>
        <div className="flex flex-col space-y-4 bg-secondary/50 px-4 py-8 md:px-16">
          <SignUp />
        </div>
      </div>
    </Modal>
  );
};
