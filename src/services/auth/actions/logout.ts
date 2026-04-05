import { createAsyncThunk } from '@reduxjs/toolkit';

import { authApi } from '@utils/auth/auth-api.ts';

export const logoutUser = createAsyncThunk('auth/logout', authApi.logout);
