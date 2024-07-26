'use client';

import { useState } from 'react';
import { SignUp } from '@clerk/nextjs';

import { useSignupModal } from '@/hooks/use-signup-modal';
import { Modal } from '@/components/shared/modal';

export const SignUpModal = () => {
  const signUpModal = useSignupModal();
  const [signUpClicked, setSignUpClicked] = useState(false);

  return (
    <Modal showModal={signUpModal.isOpen} setShowModal={signUpModal.onClose}>
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
