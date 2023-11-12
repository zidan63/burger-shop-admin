import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "@services/user";
import { UserThunks } from "./userThunks";
import { UserFilter, UserForm } from "./types";

export type UserState = {
  users: User[];
  totalUser: number;
  filter: UserFilter;
  form: UserForm;
  table: {
    loading: boolean;
  };
  loading: boolean;
  error?: {
    code?: string;
    message?: string;
  };
};

const initialState: UserState = {
  users: [],
  totalUser: 0,
  filter: {
    page: 1,
    pageSize: 10,
  },
  form: {
    open: false,
    user: null,
  },
  table: {
    loading: false,
  },
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<UserForm>) => {
      state.form = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UserThunks.search.pending, (state, action) => {
        state.table.loading = true;
        if (!action.meta.arg.userFilter) state.filter = initialState.filter;
        else state.filter = { ...action.meta.arg.userFilter };
      })
      .addCase(UserThunks.search.fulfilled, (state, action) => {
        state.users = action.payload.records;
        state.totalUser = action.payload.totalRecord;
        state.filter.page = action.payload.pageCurrent;
        state.table.loading = false;
      })
      .addCase(UserThunks.search.rejected, (state) => {
        state.table.loading = false;
      });

    builder.addCase(UserThunks.create.fulfilled, (state, action) => {
      state.users.unshift(action.payload);
    });

    builder.addCase(UserThunks.update.fulfilled, (state, action) => {
      state.form = { open: false, user: null };
      state.users = state.users.map((user) => {
        if (user.id === action.payload.id) return action.payload;
        return user;
      });
    });

    builder.addCase(UserThunks.delete.fulfilled, (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    });
  },
});

export const UserActions = userSlice.actions;
export { userSlice };
