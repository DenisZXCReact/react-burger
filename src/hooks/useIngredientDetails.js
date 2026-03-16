import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import {
  getIngredientDetails,
  setIngredientDetails,
} from '@services/details-modal/ingredient-details-slice.js';
import { getIngredientById } from '@services/ingredients/ingredients-slice.js';

export const useIngredientDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();

  const ingredientFromUrl = useSelector((state) => getIngredientById(state, id));
  const ingredientDetails = useSelector(getIngredientDetails);
  const isIngredientUrl = location.pathname.includes('/ingredient/');
  const backgroundLocation = location.state?.backgroundLocation;

  const isDirectLink = isIngredientUrl && !backgroundLocation;

  if (ingredientFromUrl && !ingredientDetails.name) {
    dispatch(setIngredientDetails(ingredientFromUrl));
  }

  return {
    isDirectLink,
    backgroundLocation,
    isIngredientUrl,
    ingredientDetails,
  };
};
