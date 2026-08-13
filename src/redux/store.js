import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import productReducer from "./productSlice";
import cartReducer from "./cartSlice";

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
  },
});

export const persistor = persistStore(store);