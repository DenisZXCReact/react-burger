import { createAsyncThunk } from '@reduxjs/toolkit';

import { authApi } from '@utils/auth/auth-api.ts';

export const registerUser = createAsyncThunk('auth/register', authApi.register);
