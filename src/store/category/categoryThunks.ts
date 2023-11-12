import { createAsyncThunk } from "@reduxjs/toolkit";
import { CategoryFilter } from "./types";
import { SearchResult, SearchType } from "@types";
import { Category, CreateCategory } from "@services/category";
import { categoryService } from "@services/category/CategoryService";

export const CategoryThunks = {
  search: createAsyncThunk<SearchResult<Category>, { categoryFilter?: CategoryFilter }>(
    "category/search",
    async (payload) => {
      return categoryService.search({ searchType: SearchType.NORMAL, ...payload.categoryFilter });
    }
  ),

  create: createAsyncThunk<Category, CreateCategory>("category/create", async (category) => {
    return categoryService.create(category);
  }),

  update: createAsyncThunk<Category, Category>("category/update", async (payload) => {
    return categoryService.update(payload);
  }),

  delete: createAsyncThunk<string, string>("category/delete", async (categoryId) => {
    await categoryService.delete(categoryId);
    return categoryId;
  }),
};
