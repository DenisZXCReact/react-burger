import { createAsyncThunk } from '@reduxjs/toolkit';

import { authApi } from '@utils/auth/auth-api.ts';

export const loginUser = createAsyncThunk('auth/login', authApi.login);
