import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { authSlice } from '@services/auth/auth-slice.js';
import { burgerIngredientsSlice } from '@services/burder-ingredients/burder-ingredients-slice.js';
import { ingredientDetailsSlice } from '@services/details-modal/ingredient-details-slice.js';
import {
  feedSocketSlice,
  connect as feedConnect,
  disconnect as feedDisconnect,
  onOpen as feedOnOpen,
  onClose as feedOnClose,
  onMessage as feedOnMessage,
  onError as feedOnError,
} from '@services/feed-socket/feed-socket-slice.ts';
import { ingredientsSlice } from '@services/ingredients/ingredients-slice.js';
import { createSocketMiddleware } from '@services/middleware/socketMiddleware.ts';
import { orderModalSlice } from '@services/order-modal/order-modal-slice.ts';
import { orderDetailsSlice } from '@services/orderDetails/order-details-slice.js';
import {
  profileSocketSlice,
  connect as profileConnect,
  disconnect as profileDisconnect,
  onOpen as profileOnOpen,
  onClose as profileOnClose,
  onMessage as profileOnMessage,
  onError as profileOnError,
} from '@services/profile-socket/profile-socket-slice.ts';

const feedSocketMiddleware = createSocketMiddleware({
  connect: feedConnect,
  disconnect: feedDisconnect,
  onOpen: feedOnOpen,
  onClose: feedOnClose,
  onMessage: feedOnMessage,
  onError: feedOnError,
});

const profileSocketMiddleware = createSocketMiddleware({
  connect: profileConnect,
  disconnect: profileDisconnect,
  onOpen: profileOnOpen,
  onClose: profileOnClose,
  onMessage: profileOnMessage,
  onError: profileOnError,
});

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
    getDefaultMiddleware().concat([feedSocketMiddleware, profileSocketMiddleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
