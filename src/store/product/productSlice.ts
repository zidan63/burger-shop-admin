import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductFilter, ProductForm } from "./types";
import { Product } from "@services/product";
import { ProductThunks } from "./productThunks";

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
  extraReducers: (builder) => {
    builder
      .addCase(ProductThunks.search.pending, (state, action) => {
        state.table.loading = true;
        if (!action.meta.arg.productFilter) state.filter = initialState.filter;
        else state.filter = { ...action.meta.arg.productFilter };
      })
      .addCase(ProductThunks.search.fulfilled, (state, action) => {
        state.products = action.payload.records;
        state.totalProduct = action.payload.totalRecord;
        state.filter.page = action.payload.pageCurrent;
        state.table.loading = false;
      })
      .addCase(ProductThunks.search.rejected, (state) => {
        state.table.loading = false;
      });

    builder.addCase(ProductThunks.create.fulfilled, (state, action) => {
      state.products.unshift(action.payload);
    });

    builder.addCase(ProductThunks.update.fulfilled, (state, action) => {
      state.form = { open: false, product: null };
      state.products = state.products.map((c) => {
        if (c.id === action.payload.id) return action.payload;
        return c;
      });
    });

    builder.addCase(ProductThunks.delete.fulfilled, (state, action) => {
      state.products = state.products.filter((c) => c.id !== action.payload);
    });
  },
});

export const ProductActions = productSlice.actions;
export { productSlice };
