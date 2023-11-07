import { createSelector } from "@reduxjs/toolkit";
import { UserState } from "./userSlice";

interface PartialUserState {
  user: UserState;
}

const userStateSelector = (state: PartialUserState) => state.user;

export const UserSelectors = {
  userStateSelector,
  getAll: () =>
    createSelector(userStateSelector, ({ users, totalUser }) => {
      return { users, totalUser };
    }),

  getForm: () =>
    createSelector(userStateSelector, ({ form }) => {
      return form;
    }),

  getFilter: () =>
    createSelector(userStateSelector, ({ filter }) => {
      return filter;
    }),

  getTable: () =>
    createSelector(userStateSelector, ({ table }) => {
      return table;
    }),
};
