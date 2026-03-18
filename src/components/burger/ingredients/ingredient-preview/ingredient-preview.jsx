import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import IngredientDetails from '@components/burger/ingredients/ingredient-details/ingredient-details.jsx';
import Modal from '@components/modal/modal.jsx';
import { setIngredientDetails } from '@services/details-modal/ingredient-details-slice.js';

export default function IngredientPreview() {
  console.log('popup');
  const dispatch = useDispatch();

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
