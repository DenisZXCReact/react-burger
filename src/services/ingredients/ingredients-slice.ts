import { createSlice } from '@reduxjs/toolkit';

import { loadIngredients } from './ingredients-action.ts';

import type { TIngredient } from '@/types/types.ts';

type TIngredientsState = {
  loading: boolean;
  error: null | string;
  ingredients: TIngredient[];
};

const initialState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null,
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state.ingredients,
    getIngredientById: (state, id) => {
      return state.ingredients.find((ingredient) => ingredient._id === id);
    },
    getIngredientsLoading: (state) => state.loading,
    getIngredientsError: (state) => state.error,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.loading = false;
      })
      .addCase(loadIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadIngredients.rejected, (state, action) => {
        state.error = action.error?.message ?? 'Unknown error';
        state.loading = false;
      });
  },
});

export const {
  getIngredients,
  getIngredientsLoading,
  getIngredientsError,
  getIngredientById,
} = ingredientsSlice.selectors;
