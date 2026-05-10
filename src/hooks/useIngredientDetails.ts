import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '@hooks/useAppDispatch.js';
import { useAppSelector } from '@hooks/useAppSelector.js';
import {
  getIngredientDetails,
  setIngredientDetails,
  type TIngredientDetailsState,
} from '@services/details-modal/ingredient-details-slice.ts';
import { getIngredientById } from '@services/ingredients/ingredients-slice.ts';

export const useIngredientDetails = (): {
  ingredientDetails: TIngredientDetailsState;
} => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const ingredientFromUrl = useAppSelector((state) => getIngredientById(state, id));
  const ingredientDetails: TIngredientDetailsState =
    useAppSelector(getIngredientDetails);

  useEffect(() => {
    if (ingredientFromUrl && !ingredientDetails) {
      dispatch(setIngredientDetails(ingredientFromUrl));
    }
  }, [ingredientFromUrl, ingredientDetails]);

  return {
    ingredientDetails,
  };
};
