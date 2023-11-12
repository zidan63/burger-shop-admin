import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateRole, Role, UpdateRole, roleService } from "@services/role";
import { RoleFilter } from "./types";
import { SearchResult, SearchType } from "@types";

export const RoleThunks = {
  search: createAsyncThunk<SearchResult<Role>, { roleFilter?: RoleFilter; isGetCount?: boolean }>(
    "role/search",
    async (payload) => {
      return roleService.search({ searchType: SearchType.NORMAL, ...payload.roleFilter });
    }
  ),

  create: createAsyncThunk<Role, CreateRole>("role/create", async (createRole) => {
    return roleService.create(createRole);
  }),

  update: createAsyncThunk<Role, Role>("role/update", async (payload) => {
    return roleService.update(payload);
  }),

  delete: createAsyncThunk<string, string>("role/delete", async (roleId) => {
    await roleService.delete(roleId);
    return roleId;
  }),

  getAllPermission: createAsyncThunk("role/getAllPermission", async () => {
    return roleService.getAllPermision();
  }),
};
