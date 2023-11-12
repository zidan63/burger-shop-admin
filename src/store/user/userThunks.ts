import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateUser, UpdateUser, User, userService } from "@services/user";
import { UserFilter } from "./types";
import { SearchResult, SearchType } from "@types";

export const UserThunks = {
  search: createAsyncThunk<SearchResult<User>, { userFilter?: UserFilter; isGetCount?: boolean }>(
    "user/search",
    async (payload) => {
      return userService.search({ searchType: SearchType.NORMAL, ...payload.userFilter });
    }
  ),

  create: createAsyncThunk<User, CreateUser>("user/create", async (user) => {
    return userService.create(user);
  }),

  update: createAsyncThunk<User, User>("user/update", async (payload) => {
    return userService.update(payload);
  }),

  delete: createAsyncThunk<string, string>("user/delete", async (userId) => {
    await userService.delete(userId);
    return userId;
  }),
};
