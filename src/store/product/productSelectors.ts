import { createSelector } from "@reduxjs/toolkit";
import { ProductState } from "./productSlice";

interface PartialProductState {
  product: ProductState;
}

const productStateSelector = (state: PartialProductState) => state.product;

export const ProductSelectors = {
  productStateSelector,
  getAll: () =>
    createSelector(productStateSelector, ({ products, totalProduct }) => {
      return { products, totalProduct };
    }),

  getForm: () =>
    createSelector(productStateSelector, ({ form }) => {
      return form;
    }),

  getFilter: () =>
    createSelector(productStateSelector, ({ filter }) => {
      return filter;
    }),

  getTable: () =>
    createSelector(productStateSelector, ({ table }) => {
      return table;
    }),
};
