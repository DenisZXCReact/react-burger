import { createAsyncThunk } from '@reduxjs/toolkit';

import { authApi } from '@utils/auth/auth-api.ts';

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  authApi.resetPassword
);
