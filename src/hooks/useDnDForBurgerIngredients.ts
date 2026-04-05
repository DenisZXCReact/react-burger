import { useAppDispatch } from '@hooks/useAppDispatch.js';
import {
  addBurgerIngredient,
  swapBurgerIngredients,
} from '@services/burder-ingredients/burder-ingredients-slice.ts';

import type { TIngredientWithKey } from '@/types/types.ts';

export type TOnDropIngredient = {
  source: 'ingredients' | 'constructor';
} & TIngredientWithKey;
export type TOnDropHandler = (ingredient: TOnDropIngredient) => void;

export default function useDnDForBurgerIngredients(
  swapTargetKey: string | null = null
): {
  onDropHandler: TOnDropHandler;
  dndName: string;
} {
  const dndName = 'burgerIngredients';
  const dispatch = useAppDispatch();
  const onDropHandler: TOnDropHandler = (ingredient) => {
    console.log('Drop ingredient', ingredient);
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
