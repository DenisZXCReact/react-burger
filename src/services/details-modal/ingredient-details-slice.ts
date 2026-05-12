import { createSlice } from '@reduxjs/toolkit';

import type { TIngredient } from '@/types/types.ts';

export type TIngredientDetailsState = TIngredient | null;

const initialState: TIngredientDetailsState = null;

export const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  selectors: {
    getIngredientDetails: (state) => state,
  },
  reducers: {
    setIngredientDetails: (_state, action) => action.payload,
  },
});
export const { getIngredientDetails } = ingredientDetailsSlice.selectors;
export const { setIngredientDetails } = ingredientDetailsSlice.actions;
