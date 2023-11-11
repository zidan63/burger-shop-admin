import { createSelector } from "@reduxjs/toolkit";
import { CategoryState } from "./categorySlice";

interface PartialCategoryState {
  category: CategoryState;
}

const categoryStateSelector = (state: PartialCategoryState) => state.category;

export const CategorySelectors = {
  categoryStateSelector,
  getAll: () =>
    createSelector(categoryStateSelector, ({ categories, totalCategory }) => {
      return { categories, totalCategory };
    }),

  getForm: () =>
    createSelector(categoryStateSelector, ({ form }) => {
      return form;
    }),

  getFilter: () =>
    createSelector(categoryStateSelector, ({ filter }) => {
      return filter;
    }),

  getTable: () =>
    createSelector(categoryStateSelector, ({ table }) => {
      return table;
    }),
};
