import { createAsyncThunk } from "@reduxjs/toolkit";
import { ColorFilter } from "./types";
import { SearchType } from "@types";
import { Category, CreateCategory, UpdateCategory } from "@services/category";
import { categoryService } from "@services/category/CategoryService";
import { colorService } from "@services/color/ColorService";
import { Color, CreateColor, UpdateColor } from "@services/color";

export const ColorThunks = {
  search: createAsyncThunk<Color[], { colorFilter?: ColorFilter; isGetCount?: boolean }>(
    "color/search",
    async (payload) => {
      return colorService.search({ searchType: SearchType.NORMAL, ...payload.colorFilter });
    }
  ),

  create: createAsyncThunk<Color, CreateColor>("color/create", async (color) => {
    return colorService.create(color);
  }),

  update: createAsyncThunk<Color, { id: string; color: UpdateColor }>(
    "color/update",
    async (payload) => {
      return colorService.update(payload.id, payload.color);
    }
  ),

  delete: createAsyncThunk<string, string>("color/delete", async (colorId) => {
    await colorService.delete(colorId);
    return colorId;
  }),
};
