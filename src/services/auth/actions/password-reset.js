import { createAsyncThunk } from '@reduxjs/toolkit';

import { authApi } from '@utils/auth/auth-api.js';

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  authApi.resetPassword
);
