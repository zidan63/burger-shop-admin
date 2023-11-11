import { createSelector } from "@reduxjs/toolkit";
import { ColorState } from "./colorSlice";

interface PartialColorState {
  color: ColorState;
}

const colorStateSelector = (state: PartialColorState) => state.color;

export const ColorSelectors = {
  colorStateSelector,
  getAll: () =>
    createSelector(colorStateSelector, ({ colors, totalColor }) => {
      return { colors, totalColor };
    }),

  getForm: () =>
    createSelector(colorStateSelector, ({ form }) => {
      return form;
    }),

  getFilter: () =>
    createSelector(colorStateSelector, ({ filter }) => {
      return filter;
    }),

  getTable: () =>
    createSelector(colorStateSelector, ({ table }) => {
      return table;
    }),
};
