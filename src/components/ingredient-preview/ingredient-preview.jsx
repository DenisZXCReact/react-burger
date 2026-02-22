import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import IngredientDetails from '@components/ingredient-details/ingredient-details.jsx';
import Modal from '@components/modal/modal.jsx';
import useModal from '@hooks/useModal.js';
import { setDetailsModal } from '@services/details-modal/details-modal-slice.js';

export default function IngredientPreview({ className, children, ingredient }) {
  const { openModal, closeModal, isModalOpen } = useModal();
  const dispatch = useDispatch();
  const openIngredientsDetails = useCallback(() => {
    dispatch(setDetailsModal(ingredient));
    openModal();
  }, [ingredient]);
  const closeIngredientsDetails = useCallback(() => {
    dispatch(setDetailsModal({}));
    closeModal();
  }, [ingredient]);
  return (
    <div className={className} onClick={openIngredientsDetails}>
      {children}
      {isModalOpen && (
        <Modal title="Детали ингредиента" onClose={closeIngredientsDetails}>
          <IngredientDetails />
        </Modal>
      )}
    </div>
  );
}
