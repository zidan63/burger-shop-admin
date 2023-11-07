import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateUser, UpdateUser, User, userService } from "@services/user";
import { UserFilter } from "./types";
import { SearchType } from "@types";

export const UserThunks = {
  search: createAsyncThunk<User[], { userFilter?: UserFilter; isGetCount?: boolean }>(
    "user/search",
    async (payload) => {
      return userService.search({ searchType: SearchType.NORMAL, ...payload.userFilter });
    }
  ),

  create: createAsyncThunk<User, CreateUser>("user/create", async (user) => {
    return userService.create(user);
  }),

  update: createAsyncThunk<User, { id: string; user: UpdateUser }>(
    "user/update",
    async (payload) => {
      return userService.update(payload.id, payload.user);
    }
  ),

  delete: createAsyncThunk<string, string>("user/delete", async (userId) => {
    await userService.delete(userId);
    return userId;
  }),
};
