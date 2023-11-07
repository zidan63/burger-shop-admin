import { createSelector } from "@reduxjs/toolkit";

import { RoleState } from "./roleSlice";

interface PartialRoleState {
  role: RoleState;
}

const roleStateSelector = (state: PartialRoleState) => state.role;

export const RoleSelectors = {
  roleStateSelector,
  getAll: () =>
    createSelector(roleStateSelector, ({ roles, totalRole, listPermission }) => {
      return { roles, totalRole, listPermission };
    }),

  getListPermission: () =>
    createSelector(roleStateSelector, ({ roles, totalRole, listPermission }) => {
      return listPermission;
    }),

  getForm: () =>
    createSelector(roleStateSelector, ({ form }) => {
      return form;
    }),

  getFilter: () =>
    createSelector(roleStateSelector, ({ filter }) => {
      return filter;
    }),

  getTable: () =>
    createSelector(roleStateSelector, ({ table }) => {
      return table;
    }),
};
