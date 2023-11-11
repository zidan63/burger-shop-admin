import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CategoryFilter, CategoryForm } from "./types";
import { Category } from "@services/category";

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
  extraReducers: (builder) => {},
});

export const CategoryActions = categorySlice.actions;
export { categorySlice };
