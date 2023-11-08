import { createSelector } from "@reduxjs/toolkit";
import { SuplierState } from "./suplierSlice";

interface PartialSuplierState {
  suplier: SuplierState;
}

const suplierStateSelector = (state: PartialSuplierState) => state.suplier;

export const SuplierSelectors = {
  suplierStateSelector,
  getAll: () =>
    createSelector(suplierStateSelector, ({ supliers, totalSuplier }) => {
      return { supliers, totalSuplier };
    }),

  getForm: () =>
    createSelector(suplierStateSelector, ({ form }) => {
      return form;
    }),

  getFilter: () =>
    createSelector(suplierStateSelector, ({ filter }) => {
      return filter;
    }),

  getTable: () =>
    createSelector(suplierStateSelector, ({ table }) => {
      return table;
    }),
};
