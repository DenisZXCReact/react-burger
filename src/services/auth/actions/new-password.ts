import { createAsyncThunk } from '@reduxjs/toolkit';

import { authApi } from '@utils/auth/auth-api.ts';

export const newPassword = createAsyncThunk('auth/newPassword', authApi.newPassword);
