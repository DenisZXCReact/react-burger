import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { authSlice } from '@services/auth/auth-slice.js';
import { burgerIngredientsSlice } from '@services/burder-ingredients/burder-ingredients-slice.js';
import { ingredientDetailsSlice } from '@services/details-modal/ingredient-details-slice.js';
import { ingredientsSlice } from '@services/ingredients/ingredients-slice.js';
import { orderDetailsSlice } from '@services/orderDetails/order-details-slice.js';

const rootReducer = combineSlices(
  ingredientsSlice,
  ingredientDetailsSlice,
  orderDetailsSlice,
  burgerIngredientsSlice,
  authSlice
);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
