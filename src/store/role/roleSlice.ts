import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Role } from "@services/role";
import { RoleThunks } from "./roleThunks";
import { RoleFilter, RoleForm } from "./types";
import { SearchType } from "@types";

export type RoleState = {
  roles: Role[];
  totalRole: number;
  filter: RoleFilter;
  form: RoleForm;
  table: {
    loading: boolean;
  };
  loading: boolean;
  error?: {
    code?: string;
    message?: string;
  };
  listPermission: any[];
};

const initialState: RoleState = {
  roles: [],
  totalRole: 0,
  filter: {
    searchType: SearchType.NORMAL,
    page: 1,
    pageSize: 10,
  },
  form: {
    open: false,
    role: null,
  },
  table: {
    loading: true,
  },
  loading: true,
  listPermission: [],
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<RoleForm>) => {
      state.form = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RoleThunks.getAll.pending, (state) => {
        state.table.loading = true;
      })
      .addCase(RoleThunks.getAll.fulfilled, (state, action) => {
        state.roles = action.payload;
        state.table.loading = false;
      })
      .addCase(RoleThunks.getAll.rejected, (state) => {
        state.table.loading = false;
      });

    builder
      .addCase(RoleThunks.search.pending, (state, action) => {
        state.table.loading = true;
        if (!action.meta.arg.roleFilter) state.filter = initialState.filter;
        else state.filter = { ...action.meta.arg.roleFilter };
      })
      .addCase(RoleThunks.search.fulfilled, (state, action) => {
        state.roles = action.payload;
        state.table.loading = false;
      })
      .addCase(RoleThunks.search.rejected, (state) => {
        state.table.loading = false;
      });

    builder.addCase(RoleThunks.create.fulfilled, (state, action) => {
      state.roles.unshift(action.payload);
    });

    builder.addCase(RoleThunks.update.fulfilled, (state, action) => {
      state.form = { open: false, role: null };
      state.roles = state.roles.map((role) => {
        if (role.id === action.payload.id) return action.payload;
        return role;
      });
    });

    builder.addCase(RoleThunks.delete.fulfilled, (state, action) => {
      const roleId = action.payload;
      state.roles = state.roles.filter((r) => r.id !== roleId);
    });

    builder.addCase(RoleThunks.getAllPermission.fulfilled, (state, action) => {
      state.listPermission = action.payload;
    });
  },
});

export const RoleActions = roleSlice.actions;
export { roleSlice };
