import { createAsyncThunk } from '@reduxjs/toolkit';

import { getOrderByIdApi } from '@utils/get-order-by-id-api.ts';

export const getOrder = createAsyncThunk('orderModal/getOrder', getOrderByIdApi);
