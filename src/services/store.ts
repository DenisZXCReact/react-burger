import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { authSlice } from '@services/auth/auth-slice.js';
import { burgerIngredientsSlice } from '@services/burder-ingredients/burder-ingredients-slice.js';
import { ingredientDetailsSlice } from '@services/details-modal/ingredient-details-slice.js';
import { feedSocketSlice } from '@services/feed-socket/feed-socket-slice.ts';
import { ingredientsSlice } from '@services/ingredients/ingredients-slice.js';
import { feedMiddleware } from '@services/middleware/feed-middleware.ts';
import { profileMiddleware } from '@services/middleware/profile-middleware.ts';
import { orderModalSlice } from '@services/order-modal/order-modal-slice.ts';
import { orderDetailsSlice } from '@services/orderDetails/order-details-slice.js';
import { profileSocketSlice } from '@services/profile-socket/profile-socket-slice.ts';

const rootReducer = combineSlices(
  ingredientsSlice,
  ingredientDetailsSlice,
  orderDetailsSlice,
  burgerIngredientsSlice,
  authSlice,
  feedSocketSlice,
  orderModalSlice,
  profileSocketSlice
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([feedMiddleware, profileMiddleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
