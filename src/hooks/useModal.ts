import { useState, useCallback } from 'react';

type TUseModelReturn = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export default function useModal(): TUseModelReturn {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);

  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return { isModalOpen, openModal, closeModal };
}
