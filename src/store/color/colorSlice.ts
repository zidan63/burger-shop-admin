import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ColorFilter, ColorForm } from "./types";
import { Color } from "@services/color";
import { ColorThunks } from "./colorThunks";

export type ColorState = {
  colors: Color[];
  totalColor: number;
  filter: ColorFilter;
  form: ColorForm;
  table: {
    loading: boolean;
  };
  loading: boolean;
  error?: {
    code?: string;
    message?: string;
  };
};

const initialState: ColorState = {
  colors: [],
  totalColor: 0,
  filter: {
    page: 1,
    pageSize: 10,
  },
  form: {
    open: false,
    color: null,
  },
  table: {
    loading: false,
  },
  loading: false,
};

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<ColorForm>) => {
      state.form = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ColorThunks.search.pending, (state, action) => {
        state.table.loading = true;
        if (!action.meta.arg.colorFilter) state.filter = initialState.filter;
        else state.filter = { ...action.meta.arg.colorFilter };
      })
      .addCase(ColorThunks.search.fulfilled, (state, action) => {
        state.colors = action.payload.records;
        state.totalColor = action.payload.totalRecord;
        state.filter.page = action.payload.pageCurrent;
        state.table.loading = false;
      })
      .addCase(ColorThunks.search.rejected, (state) => {
        state.table.loading = false;
      });

    builder.addCase(ColorThunks.create.fulfilled, (state, action) => {
      state.colors.unshift(action.payload);
    });

    builder.addCase(ColorThunks.update.fulfilled, (state, action) => {
      state.form = { open: false, color: null };
      state.colors = state.colors.map((c) => {
        if (c.id === action.payload.id) return action.payload;
        return c;
      });
    });

    builder.addCase(ColorThunks.delete.fulfilled, (state, action) => {
      state.colors = state.colors.filter((c) => c.id !== action.payload);
    });
  },
});

export const ColorActions = colorSlice.actions;
export { colorSlice };
