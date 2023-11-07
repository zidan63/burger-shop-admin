import { createSelector } from "@reduxjs/toolkit";
import { AuthState } from "./authSlice";

interface PartialAuthState {
  auth: AuthState;
}

const authStateSelector = (state: PartialAuthState) => state.auth;

export const AuthSelectors = {
  authStateSelector,

  getUserCurrent: () =>
    createSelector(authStateSelector, ({ userCurrent }) => {
      return { userCurrent };
    }),
};
