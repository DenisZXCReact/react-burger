import { createAsyncThunk } from '@reduxjs/toolkit';

import { getOrderDetails } from '@utils/create-order-api.js';

export const createOrder = createAsyncThunk(
  'orderDetails/loadIngredients',
  async (data) => {
    return getOrderDetails(data);
  }
);
