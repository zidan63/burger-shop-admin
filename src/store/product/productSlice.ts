import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductFilter, ProductForm } from "./types";
import { Product } from "@services/product";

export type ProductState = {
  products: Product[];
  totalProduct: number;
  filter: ProductFilter;
  form: ProductForm;
  table: {
    loading: boolean;
  };
  loading: boolean;
  error?: {
    code?: string;
    message?: string;
  };
};

const initialState: ProductState = {
  products: [],
  totalProduct: 0,
  filter: {
    page: 1,
    pageSize: 10,
  },
  form: {
    open: false,
    product: null,
  },
  table: {
    loading: false,
  },
  loading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<ProductForm>) => {
      state.form = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const ProductActions = productSlice.actions;
export { productSlice };
