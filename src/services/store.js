import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { burgerIngredientsSlice } from '@services/burder-ingredients/burder-ingredients-slice.js';
import { detailModalSlice } from '@services/details-modal/details-modal-slice.js';
import { ingredientsSlice } from '@services/ingredients/ingredients-slice.js';
import { orderDetailsSlice } from '@services/orderDetails/order-details-slice.js';

const rootReducer = combineSlices(
  ingredientsSlice,
  detailModalSlice,
  orderDetailsSlice,
  burgerIngredientsSlice
);

export const store = configureStore({
  reducer: rootReducer,
});
