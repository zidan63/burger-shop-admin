import { createSelector } from "@reduxjs/toolkit";

import { RoleState } from "./roleSlice";
import { Permission } from "@services/role";

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
    createSelector(roleStateSelector, ({ listPermission }) => {
      const groupedData = {};

      listPermission.forEach((item) => {
        const typeName = item.code.split("_")[1];

        if (!groupedData[typeName]) {
          groupedData[typeName] = {
            typeName: getTypeName(typeName),
            permissions: [],
          };
        }

        groupedData[typeName].permissions.push(item);
      });
      const resultArray: {
        typeName: string;
        permissions: Permission[];
      }[] = Object.values(groupedData);

      return resultArray;
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

const getTypeName = (typeName: string) => {
  const data = {
    INFO: "Quản lý thông tin cá nhân",
    USER: "Quản lý tài khoản",
    ROLE: "Quản lý vai trò",
    CATEGORY: "Quản lý loại sản phẩm",
    COLOR: "Quản  lý màu sắc",
    SUPPLIER: "Quản lý nhà cung cấp",
    PRODUCT: "Quản lý sản phẩm",
    CART: "Quản lý giỏ hàng",
    BILL: "Quản lý đơn hàng",
  };

  return data[typeName];
};
