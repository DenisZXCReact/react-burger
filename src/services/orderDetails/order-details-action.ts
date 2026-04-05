import { createAsyncThunk } from '@reduxjs/toolkit';

import { getOrderDetails } from '@utils/create-order-api.ts';

export const createOrder = createAsyncThunk(
  'orderDetails/loadIngredients',
  getOrderDetails
);
