import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ToppingFilter, ToppingForm } from "./types";

import { Topping } from "@services/topping";
import { ToppingThunks } from "./toppingThunks";

export type ToppingState = {
  toppings: Topping[];
  totalTopping: number;
  filter: ToppingFilter;
  form: ToppingForm;
  table: {
    loading: boolean;
  };
  loading: boolean;
  error?: {
    code?: string;
    message?: string;
  };
};

const initialState: ToppingState = {
  toppings: [],
  totalTopping: 0,
  filter: {
    page: 1,
    pageSize: 10,
  },
  form: {
    open: false,
    topping: null,
  },
  table: {
    loading: false,
  },
  loading: false,
};

const toppingSlice = createSlice({
  name: "topping",
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<ToppingForm>) => {
      state.form = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ToppingThunks.search.pending, (state, action) => {
        state.table.loading = true;
        if (!action.meta.arg.toppingFilter) state.filter = initialState.filter;
        else state.filter = { ...action.meta.arg.toppingFilter };
      })
      .addCase(ToppingThunks.search.fulfilled, (state, action) => {
        state.toppings = action.payload.records;
        state.totalTopping = action.payload.totalRecord;
        state.filter.page = action.payload.pageCurrent;
        state.table.loading = false;
      })
      .addCase(ToppingThunks.search.rejected, (state) => {
        state.table.loading = false;
      });

    builder.addCase(ToppingThunks.create.fulfilled, (state, action) => {
      state.toppings.unshift(action.payload);
    });

    builder.addCase(ToppingThunks.update.fulfilled, (state, action) => {
      state.form = { open: false, topping: null };
      state.toppings = state.toppings.map((c) => {
        if (c.id === action.payload.id) return action.payload;
        return c;
      });
    });

    builder.addCase(ToppingThunks.delete.fulfilled, (state, action) => {
      state.toppings = state.toppings.filter((c) => c.id !== action.payload);
    });
  },
});

export const ToppingActions = toppingSlice.actions;
export { toppingSlice };
