import { createAsyncThunk } from '@reduxjs/toolkit';

import { authApi } from '@utils/auth/auth-api.js';

export const registerUser = createAsyncThunk('auth/register', authApi.register);
