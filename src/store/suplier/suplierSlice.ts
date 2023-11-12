import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SuplierFilter, SuplierForm } from "./types";
import { Suplier } from "@services/suplier";
import { SuplierThunks } from "./suplierThunks";

export type SuplierState = {
  supliers: Suplier[];
  totalSuplier: number;
  filter: SuplierFilter;
  form: SuplierForm;
  table: {
    loading: boolean;
  };
  loading: boolean;
  error?: {
    code?: string;
    message?: string;
  };
};

const initialState: SuplierState = {
  supliers: [],
  totalSuplier: 0,
  filter: {
    page: 1,
    pageSize: 10,
  },
  form: {
    open: false,
    suplier: null,
  },
  table: {
    loading: false,
  },
  loading: false,
};

const suplierSlice = createSlice({
  name: "suplier",
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<SuplierForm>) => {
      state.form = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SuplierThunks.search.pending, (state, action) => {
        state.table.loading = true;
        if (!action.meta.arg.suplierFilter) state.filter = initialState.filter;
        else state.filter = { ...action.meta.arg.suplierFilter };
      })
      .addCase(SuplierThunks.search.fulfilled, (state, action) => {
        state.supliers = action.payload.records;
        state.totalSuplier = action.payload.totalRecord;
        state.filter.page = action.payload.pageCurrent;
        state.table.loading = false;
      })
      .addCase(SuplierThunks.search.rejected, (state) => {
        state.table.loading = false;
      });

    builder.addCase(SuplierThunks.create.fulfilled, (state, action) => {
      state.supliers.unshift(action.payload);
    });

    builder.addCase(SuplierThunks.update.fulfilled, (state, action) => {
      state.form = { open: false, suplier: null };
      state.supliers = state.supliers.map((c) => {
        if (c.id === action.payload.id) return action.payload;
        return c;
      });
    });

    builder.addCase(SuplierThunks.delete.fulfilled, (state, action) => {
      state.supliers = state.supliers.filter((c) => c.id !== action.payload);
    });
  },
});

export const SuplierActions = suplierSlice.actions;
export { suplierSlice };
