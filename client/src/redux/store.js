import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import searchSlice from "./searchSlice";

export const store = configureStore({
  reducer: {
    productReducer,
    cartReducer,
    authReducer,
    searchSlice,
  },
});
