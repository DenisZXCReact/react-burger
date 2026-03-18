import { createSlice } from '@reduxjs/toolkit';
const initialState = {};

export const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  selectors: {
    getIngredientDetails: (state) => state,
  },
  reducers: {
    setIngredientDetails: (state, action) => action.payload,
  },
});
export const { getIngredientDetails } = ingredientDetailsSlice.selectors;
export const { setIngredientDetails } = ingredientDetailsSlice.actions;
