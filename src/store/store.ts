import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { TypedUseSelectorHook } from "react-redux";
import { addressSlice } from "./address";
import { authSlice } from "./auth";
import { categorySlice } from "./category";
import { orderSlice } from "./order";
import { productSlice } from "./product";
import { roleSlice } from "./role";
import { supplierSlice } from "./supplier";
import { toppingSlice } from "./topping";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { userSlice } from "./user";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
  category: categorySlice.reducer,
  topping: toppingSlice.reducer,
  order: orderSlice.reducer,
  product: productSlice.reducer,
  address: addressSlice.reducer,
  supplier: supplierSlice.reducer,
  role: roleSlice.reducer,
});

type RootState = ReturnType<typeof rootReducer>;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const store = configureStore({
  reducer: rootReducer,
});

type AppDispatch = typeof store.dispatch;
const useAppDispatch = () => useDispatch<AppDispatch>();

export { store, useAppDispatch, useAppSelector };
export type { RootState, AppDispatch };
