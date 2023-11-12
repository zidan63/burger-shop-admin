import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CategoryFilter, CategoryForm } from "./types";
import { Category } from "@services/category";
import { CategoryThunks } from "./categoryThunks";

export type CategoryState = {
  categories: Category[];
  totalCategory: number;
  filter: CategoryFilter;
  form: CategoryForm;
  table: {
    loading: boolean;
  };
  loading: boolean;
  error?: {
    code?: string;
    message?: string;
  };
};

const initialState: CategoryState = {
  categories: [],
  totalCategory: 0,
  filter: {
    page: 1,
    pageSize: 10,
  },
  form: {
    open: false,
    category: null,
  },
  table: {
    loading: false,
  },
  loading: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<CategoryForm>) => {
      state.form = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CategoryThunks.search.pending, (state, action) => {
        state.table.loading = true;
        if (!action.meta.arg.categoryFilter) state.filter = initialState.filter;
        else state.filter = { ...action.meta.arg.categoryFilter };
      })
      .addCase(CategoryThunks.search.fulfilled, (state, action) => {
        state.categories = action.payload.records;
        state.totalCategory = action.payload.totalRecord;
        state.filter.page = action.payload.pageCurrent;
        state.table.loading = false;
      })
      .addCase(CategoryThunks.search.rejected, (state) => {
        state.table.loading = false;
      });

    builder.addCase(CategoryThunks.create.fulfilled, (state, action) => {
      state.categories.unshift(action.payload);
    });

    builder.addCase(CategoryThunks.update.fulfilled, (state, action) => {
      state.form = { open: false, category: null };
      state.categories = state.categories.map((c) => {
        if (c.id === action.payload.id) return action.payload;
        return c;
      });
    });

    builder.addCase(CategoryThunks.delete.fulfilled, (state, action) => {
      state.categories = state.categories.filter((c) => c.id !== action.payload);
    });
  },
});

export const CategoryActions = categorySlice.actions;
export { categorySlice };
