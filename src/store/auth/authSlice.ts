import { createSlice } from "@reduxjs/toolkit";
import { User } from "@services/user";
import { AuthThunks } from "./authThunks";

export type AuthState = {
  userCurrent: User | null;
};

const initialState: AuthState = {
  userCurrent: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(AuthThunks.getUserCurrent.fulfilled, (state, action) => {
      state.userCurrent = action.payload;
    });
  },
});

export const AuthActions = authSlice.actions;
export { authSlice };
