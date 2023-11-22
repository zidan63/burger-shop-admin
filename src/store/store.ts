import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { userSlice } from "./user";
import { roleSlice } from "./role";

import { authSlice } from "./auth";
import { productSlice } from "./product";
import { supplierSlice } from "./supplier";
import { categorySlice } from "./category";
import { colorSlice } from "./color";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
  category: categorySlice.reducer,
  color: colorSlice.reducer,
  product: productSlice.reducer,
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
