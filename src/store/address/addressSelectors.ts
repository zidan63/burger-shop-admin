import { createSelector } from "@reduxjs/toolkit";
import { AddressState } from "./addressSlice";

interface PartialAddressState {
  address: AddressState;
}

const addressStateSelector = (state: PartialAddressState) => state.address;

export const AddressSelectors = {
  addressStateSelector,
  getAll: () =>
    createSelector(addressStateSelector, ({ addresses, totalAddress }) => {
      return { addresses, totalAddress };
    }),

  getForm: () =>
    createSelector(addressStateSelector, ({ form }) => {
      return form;
    }),

  getFilter: () =>
    createSelector(addressStateSelector, ({ filter }) => {
      return filter;
    }),

  getTable: () =>
    createSelector(addressStateSelector, ({ table }) => {
      return table;
    }),
};
