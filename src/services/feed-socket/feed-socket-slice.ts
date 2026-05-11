import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { TFeedData } from '@/types/types.ts';

type TFeedSocketState = {
  isConnected: boolean;
  data: TFeedData | null;
  error: null | string;
  isLoading: boolean;
};
const initialState: TFeedSocketState = {
  isConnected: false,
  data: null,
  error: null,
  isLoading: false,
};
export const feedSocketSlice = createSlice({
  name: 'feedSocket',
  initialState,
  selectors: {
    getIsFeedSocketConnected: (state) => state.isConnected,
    getFeedData: (state) => state.data,
  },
  reducers: {
    connect: (state, _action: PayloadAction<string>) => {
      state.isLoading = true;
      state.error = null;
    },
    disconnect: (state) => {
      state.isLoading = false;
      state.data = null;
      state.isConnected = false;
    },
    onOpen: (state) => {
      state.isConnected = true;
      state.isLoading = false;
    },
    onClose: (state) => {
      state.isConnected = false;
      state.isLoading = false;
      state.data = null;
    },
    onMessage: (state, { payload }: { payload: TFeedData }) => {
      state.data = payload;
    },
    onError: (state, { payload }: { payload: string }) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

export const { getFeedData, getIsFeedSocketConnected } = feedSocketSlice.selectors;
export const { connect, disconnect, onError, onMessage, onClose, onOpen } =
  feedSocketSlice.actions;
