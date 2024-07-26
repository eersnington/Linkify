'use client';

import { SignUpModal } from '@/components/layout/sign-up-modal';
import { useMounted } from '@/hooks/use-mounted';

export const ModalProvider = () => {
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  return (
    <>
      <SignUpModal />
      {/* add your own modals here... */}
    </>
  );
};
