import { createAsyncThunk } from '@reduxjs/toolkit';

import { setIsAuthChecked, setUser } from '@services/auth/auth-slice.ts';
import { authApi } from '@utils/auth/auth-api.ts';
import { isTokenExist } from '@utils/tokens.ts';

export const getUserData = createAsyncThunk('auth/getUser', async (_, { dispatch }) => {
  try {
    if (isTokenExist()) {
      const response = await authApi.getUser();
      dispatch(setUser(response));
    }
  } finally {
    dispatch(setIsAuthChecked(true));
  }
});
