import { createSlice } from '@reduxjs/toolkit';

import { createOrder } from '@services/orderDetails/order-details-action.js';

const initialState = {
  loading: false,
  error: null,
  details: {},
};
export const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  selectors: {
    getOrderInfo: (state) => state.details,
    getOrderLoading: (state) => state.loading,
    getOrderError: (state) => state.error,
  },
  extraReducers: (builder) =>
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.error?.message ?? 'Unknown error';
        state.loading = false;
      }),
});

export const { getOrderInfo, getOrderLoading, getOrderError } =
  orderDetailsSlice.selectors;
