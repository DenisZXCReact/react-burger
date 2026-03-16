import { createAsyncThunk } from '@reduxjs/toolkit';

import { authApi } from '@utils/auth/auth-api.js';

export const newPassword = createAsyncThunk('auth/newPassword', authApi.newPassword);
