import { CreateTopping, Topping } from "@services/topping";
import { SearchResult, SearchType } from "@types";

import { ToppingFilter } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toppingService } from "@services/topping/ToppingService";

export const ToppingThunks = {
  search: createAsyncThunk<SearchResult<Topping>, { toppingFilter?: ToppingFilter }>(
    "topping/search",
    async (payload) => {
      return toppingService.search({ searchType: SearchType.NORMAL, ...payload.toppingFilter });
    }
  ),

  create: createAsyncThunk<Topping, CreateTopping>("topping/create", async (topping) => {
    return toppingService.create(topping);
  }),

  update: createAsyncThunk<Topping, Topping>("topping/update", async (payload) => {
    return toppingService.update(payload);
  }),

  delete: createAsyncThunk<string, string>("topping/delete", async (toppingId) => {
    await toppingService.delete(toppingId);
    return toppingId;
  }),
};
