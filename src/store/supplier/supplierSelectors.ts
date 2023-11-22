import { createSelector } from "@reduxjs/toolkit";
import { SupplierState } from "./supplierSlice";

interface PartialSupplierState {
  supplier: SupplierState;
}

const supplierStateSelector = (state: PartialSupplierState) => state.supplier;

export const SupplierSelectors = {
  supplierStateSelector,
  getAll: () =>
    createSelector(supplierStateSelector, ({ suppliers, totalSupplier }) => {
      return { suppliers, totalSupplier };
    }),

  getForm: () =>
    createSelector(supplierStateSelector, ({ form }) => {
      return form;
    }),

  getFilter: () =>
    createSelector(supplierStateSelector, ({ filter }) => {
      return filter;
    }),

  getTable: () =>
    createSelector(supplierStateSelector, ({ table }) => {
      return table;
    }),
};
