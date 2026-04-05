import { createAsyncThunk } from '@reduxjs/toolkit';

import { changeUserData } from '@utils/auth/auth-api.ts';

export const updateUser = createAsyncThunk('auth/changeUserData', changeUserData);
