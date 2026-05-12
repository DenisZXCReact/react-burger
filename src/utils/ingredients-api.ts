import baseRequest from '@utils/baseRequest.ts';

import type { TIngredient } from '@/types/types.ts';

type TFetchIngredientsResponse = {
  data: TIngredient[];
  success: boolean;
};

export const fetchIngredients = async (): Promise<TIngredient[]> => {
  const result = await baseRequest<TFetchIngredientsResponse>('ingredients');
  return result.data;
};
