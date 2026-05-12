import { useAppSelector } from '@hooks/useAppSelector.ts';
import { getIngredientById } from '@services/ingredients/ingredients-slice.ts';

type TReturnIngredientData = {
  price: number | undefined;
  image: string | undefined;
  name: string | undefined;
};

export const useIngredientData = (id: string): TReturnIngredientData => {
  const ingredientData = useAppSelector((state) => getIngredientById(state, id));
  return {
    price: ingredientData?.price,
    image: ingredientData?.image,
    name: ingredientData?.name,
  };
};
