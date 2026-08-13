import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
} from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import notificationReducer from "./notificationSlice";

const persistConfig = {
  key: "cart",
  storage,
};

const persistedCartReducer = persistReducer(
  persistConfig,
  cartReducer
);

export const store = configureStore({
   reducer: {
    products: productReducer,
    cart: persistedCartReducer,
    notification: notificationReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});

export const persistor = persistStore(store);