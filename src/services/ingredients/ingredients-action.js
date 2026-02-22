import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchIngredients } from '@utils/ingredients-api.js';

export const loadIngredients = createAsyncThunk(
  'ingredients/loadIngredients',
  async () => {
    return fetchIngredients();
  }
);
