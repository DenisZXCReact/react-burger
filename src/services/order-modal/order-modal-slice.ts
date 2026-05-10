import { createSlice } from '@reduxjs/toolkit';

import { getOrder } from '@services/order-modal/order-modal-action.ts';

import type { TFeedOrder } from '@/types/types.ts';

type TOrderModalState = {
  order: TFeedOrder | null;
  loading: boolean;
  error: string | null;
};

const initialState: TOrderModalState = {
  order: null,
  loading: false,
  error: null,
};

export const orderModalSlice = createSlice({
  name: 'orderModal',
  initialState,
  selectors: {
    getOrderModal: (state) => state.order,
    getOrderModalLoading: (state) => state.loading,
    getOrderModalError: (state) => state.error,
  },
  reducers: {
    setOrderModal: (state, action) => {
      state.order = action.payload;
    },
    clearOrderModal: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message ?? 'Unknown error';
      });
  },
});

export const { getOrderModal, getOrderModalLoading, getOrderModalError } =
  orderModalSlice.selectors;
export const { setOrderModal, clearOrderModal } = orderModalSlice.actions;
