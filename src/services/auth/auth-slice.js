import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { updateUser } from '@services/auth/actions/change-user-data.js';
import { getUserData } from '@services/auth/actions/get-user.js';
import { loginUser } from '@services/auth/actions/login.js';
import { logoutUser } from '@services/auth/actions/logout.js';
import { newPassword } from '@services/auth/actions/new-password.js';
import { resetPassword } from '@services/auth/actions/password-reset.js';
import { registerUser } from '@services/auth/actions/register.js';
const initialState = {
  error: null,
  loading: false,
  isAuthChecked: false,
  user: null,
};
const isAuthPendingAction = (action) =>
  action.type.startsWith('auth/') && action.type.endsWith('pending');
const isAuthRejectedAction = (action) =>
  action.type.startsWith('auth/') && action.type.endsWith('rejected');

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  selectors: {
    isAuthLoading: (state) => state.loading,
    isAuthError: (state) => state.error,
    getAuthUser: (state) => state.user,
    isAuthChecked: (state) => state.isAuthChecked,
  },
  reducers: {
    setIsAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.user = null;
      })
      .addMatcher(
        isAnyOf(loginUser.fulfilled, registerUser.fulfilled, updateUser.fulfilled),
        (state, action) => {
          state.loading = false;
          state.error = null;
          state.user = action.payload;
          state.isAuthChecked = true;
        }
      )
      .addMatcher(
        isAnyOf(newPassword.fulfilled, resetPassword.fulfilled, getUserData.fulfilled),
        (state) => {
          state.loading = false;
          state.error = null;
        }
      )

      .addMatcher(isAuthPendingAction, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isAuthRejectedAction, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message ?? 'Unknown error';
      });
  },
});
export const { getAuthUser, isAuthError, isAuthLoading, isAuthChecked } =
  authSlice.selectors;
export const { setIsAuthChecked, setUser } = authSlice.actions;
