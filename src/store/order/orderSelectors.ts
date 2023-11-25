import { createSelector } from "@reduxjs/toolkit";
import { OrderState } from "./orderSlice";

interface PartialOrderState {
  order: OrderState;
}

const orderStateSelector = (state: PartialOrderState) => state.order;

export const OrderSelectors = {
  orderStateSelector,
  getAll: () =>
    createSelector(orderStateSelector, ({ orders, totalOrder }) => {
      return { orders, totalOrder };
    }),

  getForm: () =>
    createSelector(orderStateSelector, ({ form }) => {
      return form;
    }),

  getFilter: () =>
    createSelector(orderStateSelector, ({ filter }) => {
      return filter;
    }),

  getTable: () =>
    createSelector(orderStateSelector, ({ table }) => {
      return table;
    }),
};
