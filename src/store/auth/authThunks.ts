import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "@services/auth";
import { User } from "@services/user";

export const AuthThunks = {
  getUserCurrent: createAsyncThunk<User, void>("auth/getUserCurrent", async () => {
    return authService.getUser();
  }),
};
