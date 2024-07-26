import { create } from 'zustand';

interface useSignupModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSignupModal = create<useSignupModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
