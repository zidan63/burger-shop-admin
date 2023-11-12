import { createAsyncThunk } from "@reduxjs/toolkit";
import { ColorFilter } from "./types";
import { SearchResult, SearchType } from "@types";
import { Color, CreateColor } from "@services/color";
import { colorService } from "@services/color/ColorService";

export const ColorThunks = {
  search: createAsyncThunk<SearchResult<Color>, { colorFilter?: ColorFilter }>(
    "color/search",
    async (payload) => {
      return colorService.search({ searchType: SearchType.NORMAL, ...payload.colorFilter });
    }
  ),

  create: createAsyncThunk<Color, CreateColor>("color/create", async (color) => {
    return colorService.create(color);
  }),

  update: createAsyncThunk<Color, Color>("color/update", async (payload) => {
    return colorService.update(payload);
  }),

  delete: createAsyncThunk<string, string>("color/delete", async (colorId) => {
    await colorService.delete(colorId);
    return colorId;
  }),
};
