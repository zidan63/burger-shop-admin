import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateRole, Role, UpdateRole, roleService } from "@services/role";
import { RoleFilter } from "./types";
import { SearchType } from "@types";

export const RoleThunks = {
  getAll: createAsyncThunk<any, void>("role/getAll", async () => {
    return roleService.getAll();
  }),

  search: createAsyncThunk<any, { roleFilter?: RoleFilter; isGetCount?: boolean }>(
    "role/search",
    async (payload) => {
      return roleService.search({ searchType: SearchType.NORMAL, ...payload.roleFilter });
    }
  ),

  create: createAsyncThunk<Role, CreateRole>("role/create", async (createRole) => {
    return roleService.create(createRole);
  }),

  update: createAsyncThunk<Role, { roleId: string; updateRole: UpdateRole }>(
    "role/update",
    async ({ roleId, updateRole }) => {
      return roleService.update(roleId, updateRole);
    }
  ),

  delete: createAsyncThunk<string, string>("role/delete", async (roleId) => {
    await roleService.delete(roleId);
    return roleId;
  }),

  getAllPermission: createAsyncThunk("role/getAllPermission", async () => {
    return roleService.getAllPermision();
  }),
};
