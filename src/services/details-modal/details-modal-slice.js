import { createSlice } from '@reduxjs/toolkit';
const initialState = {};

export const detailModalSlice = createSlice({
  name: 'detailsModal',
  initialState,
  selectors: {
    getDetailsModal: (state) => state,
  },
  reducers: {
    setDetailsModal: (state, action) => action.payload,
  },
});
export const { getDetailsModal } = detailModalSlice.selectors;
export const { setDetailsModal } = detailModalSlice.actions;
