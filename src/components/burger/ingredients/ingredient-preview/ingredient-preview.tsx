import { type ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import IngredientDetails from '@components/burger/ingredients/ingredient-details/ingredient-details.tsx';
import Modal from '@components/modal/modal.tsx';
import { useAppDispatch } from '@hooks/useAppDispatch.ts';
import { setIngredientDetails } from '@services/details-modal/ingredient-details-slice.ts';

export default function IngredientPreview(): ReactNode {
  console.log('popup');
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const closeIngredientsDetails = useCallback(() => {
    navigate('/');
    dispatch(setIngredientDetails({}));
  }, []);
  return (
    <Modal title="Детали ингредиента" onClose={closeIngredientsDetails}>
      <IngredientDetails />
    </Modal>
  );
}
