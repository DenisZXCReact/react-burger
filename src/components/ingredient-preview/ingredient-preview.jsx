import IngredientDetails from '@components/ingredient-details/ingredient-details.jsx';
import Modal from '@components/modal/modal.jsx';
import useModal from '@hooks/useModal.js';

export default function IngredientPreview({ className, ingredient, children }) {
  const { openModal, closeModal, isModalOpen } = useModal();

  return (
    <div className={className} onClick={openModal}>
      {children}
      {isModalOpen && (
        <Modal title="Детали ингредиента" onClose={closeModal}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </div>
  );
}
