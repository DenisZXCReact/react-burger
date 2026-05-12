import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchIngredients } from '@utils/ingredients-api.ts';

export const loadIngredients = createAsyncThunk(
  'ingredients/loadIngredients',
  fetchIngredients
);
