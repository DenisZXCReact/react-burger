import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  getIngredientDetails,
  setIngredientDetails,
} from '@services/details-modal/ingredient-details-slice.js';
import { getIngredientById } from '@services/ingredients/ingredients-slice.js';

export const useIngredientDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const ingredientFromUrl = useSelector((state) => getIngredientById(state, id));
  const ingredientDetails = useSelector(getIngredientDetails);

  useEffect(() => {
    if (ingredientFromUrl && !ingredientDetails.name) {
      dispatch(setIngredientDetails(ingredientFromUrl));
    }
  }, [ingredientFromUrl, ingredientDetails]);

  return {
    ingredientDetails,
  };
};
