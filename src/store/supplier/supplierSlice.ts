import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SupplierFilter, SupplierForm } from "./types";
import { Supplier } from "@services/supplier";
import { SupplierThunks } from "./supplierThunks";

export type SupplierState = {
  suppliers: Supplier[];
  totalSupplier: number;
  filter: SupplierFilter;
  form: SupplierForm;
  table: {
    loading: boolean;
  };
  loading: boolean;
  error?: {
    code?: string;
    message?: string;
  };
};

const initialState: SupplierState = {
  suppliers: [],
  totalSupplier: 0,
  filter: {
    page: 1,
    pageSize: 10,
  },
  form: {
    open: false,
    supplier: null,
  },
  table: {
    loading: false,
  },
  loading: false,
};

const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<SupplierForm>) => {
      state.form = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SupplierThunks.search.pending, (state, action) => {
        state.table.loading = true;
        if (!action.meta.arg.supplierFilter) state.filter = initialState.filter;
        else state.filter = { ...action.meta.arg.supplierFilter };
      })
      .addCase(SupplierThunks.search.fulfilled, (state, action) => {
        state.suppliers = action.payload.records;
        state.totalSupplier = action.payload.totalRecord;
        state.filter.page = action.payload.pageCurrent;
        state.table.loading = false;
      })
      .addCase(SupplierThunks.search.rejected, (state) => {
        state.table.loading = false;
      });

    builder.addCase(SupplierThunks.create.fulfilled, (state, action) => {
      state.suppliers.unshift(action.payload);
    });

    builder.addCase(SupplierThunks.update.fulfilled, (state, action) => {
      state.form = { open: false, supplier: null };
      state.suppliers = state.suppliers.map((c) => {
        if (c.id === action.payload.id) return action.payload;
        return c;
      });
    });

    builder.addCase(SupplierThunks.delete.fulfilled, (state, action) => {
      state.suppliers = state.suppliers.filter((c) => c.id !== action.payload);
    });
  },
});

export const SupplierActions = supplierSlice.actions;
export { supplierSlice };
