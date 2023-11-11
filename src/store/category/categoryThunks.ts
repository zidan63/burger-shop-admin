import { createAsyncThunk } from "@reduxjs/toolkit";
import { CategoryFilter } from "./types";
import { SearchType } from "@types";
import { Category, CreateCategory, UpdateCategory } from "@services/category";
import { categoryService } from "@services/category/CategoryService";

export const CategoryThunks = {
  search: createAsyncThunk<Category[], { categoryFilter?: CategoryFilter; isGetCount?: boolean }>(
    "category/search",
    async (payload) => {
      return categoryService.search({ searchType: SearchType.NORMAL, ...payload.categoryFilter });
    }
  ),

  create: createAsyncThunk<Category, CreateCategory>("category/create", async (category) => {
    return categoryService.create(category);
  }),

  update: createAsyncThunk<Category, { id: string; category: UpdateCategory }>(
    "category/update",
    async (payload) => {
      return categoryService.update(payload.id, payload.category);
    }
  ),

  delete: createAsyncThunk<string, string>("category/delete", async (categoryId) => {
    await categoryService.delete(categoryId);
    return categoryId;
  }),
};
