import { ToppingState } from "./toppingSlice";
import { createSelector } from "@reduxjs/toolkit";

interface PartialToppingState {
  topping: ToppingState;
}

const toppingStateSelector = (state: PartialToppingState) => state.topping;

export const ToppingSelectors = {
  toppingStateSelector,
  getAll: () =>
    createSelector(toppingStateSelector, ({ toppings, totalTopping }) => {
      return { toppings, totalTopping };
    }),

  getForm: () =>
    createSelector(toppingStateSelector, ({ form }) => {
      return form;
    }),

  getFilter: () =>
    createSelector(toppingStateSelector, ({ filter }) => {
      return filter;
    }),

  getTable: () =>
    createSelector(toppingStateSelector, ({ table }) => {
      return table;
    }),
};
