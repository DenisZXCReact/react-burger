import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { TFeedData } from '@/types/types.ts';
type TProfileSocketState = {
  isConnected: boolean;
  data: TFeedData | null;
  error: null | string;
  isLoading: boolean;
};
const initialState: TProfileSocketState = {
  isConnected: false,
  data: null,
  error: null,
  isLoading: false,
};
export const profileSocketSlice = createSlice({
  name: 'profileSocket',
  initialState,
  selectors: {
    getIsProfileSocketConnected: (state) => state.isConnected,
    getProfileOrdersData: (state) => state.data,
  },

  reducers: {
    connect: (state, _action: PayloadAction<string>) => {
      state.isLoading = true;
      state.error = null;
    },
    disconnect: (state) => {
      state.isLoading = false;
      state.error = null;
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
export const { getIsProfileSocketConnected, getProfileOrdersData } =
  profileSocketSlice.selectors;
export const { connect, onError, onOpen, onMessage, onClose, disconnect } =
  profileSocketSlice.actions;
