import { useDispatch } from 'react-redux';

import {
  addBurgerIngredient,
  swapBurgerIngredients,
} from '@services/burder-ingredients/burder-ingredients-slice.js';

export default function useDnDForBurgerIngredients(swapTargetKey = null) {
  const dndName = 'burgerIngredients';
  const dispatch = useDispatch();
  const onDropHandler = (ingredient) => {
    if (
      (swapTargetKey && ingredient.source === 'ingredients') ||
      (ingredient.source === 'constructor' && !swapTargetKey)
    )
      return;
    if (ingredient.source === 'ingredients') {
      dispatch(addBurgerIngredient(ingredient));
    }
    if (ingredient.source === 'constructor') {
      if (ingredient.key === swapTargetKey) return;
      dispatch(swapBurgerIngredients({ fromKey: ingredient.key, toKey: swapTargetKey }));
    }
  };
  return { onDropHandler, dndName };
}
