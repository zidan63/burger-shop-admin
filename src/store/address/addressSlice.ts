import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AddressFilter, AddressForm } from "./types";
import { Address } from "@services/address";
import { AddressThunks } from "./addressThunks";

export type AddressState = {
  addresses: Address[];
  totalAddress: number;
  filter: AddressFilter;
  form: AddressForm;
  table: {
    loading: boolean;
  };
  loading: boolean;
  error?: {
    code?: string;
    message?: string;
  };
};

const initialState: AddressState = {
  addresses: [],
  totalAddress: 0,
  filter: {
    page: 1,
    pageSize: 10,
  },
  form: {
    open: false,
    address: null,
  },
  table: {
    loading: false,
  },
  loading: false,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<AddressForm>) => {
      state.form = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddressThunks.search.pending, (state, action) => {
        state.table.loading = true;
        if (!action.meta.arg.addressFilter) state.filter = initialState.filter;
        else state.filter = { ...action.meta.arg.addressFilter };
      })
      .addCase(AddressThunks.search.fulfilled, (state, action) => {
        state.addresses = action.payload.records;
        state.totalAddress = action.payload.totalRecord;
        state.filter.page = action.payload.pageCurrent;
        state.table.loading = false;
      })
      .addCase(AddressThunks.search.rejected, (state) => {
        state.table.loading = false;
      });

    builder.addCase(AddressThunks.create.fulfilled, (state, action) => {
      state.addresses.unshift(action.payload);
    });

    builder.addCase(AddressThunks.update.fulfilled, (state, action) => {
      state.form = { open: false, address: null };
      state.addresses = state.addresses.map((c) => {
        if (c.id === action.payload.id) return action.payload;
        return c;
      });
    });

    builder.addCase(AddressThunks.delete.fulfilled, (state, action) => {
      state.addresses = state.addresses.filter((c) => c.id !== action.payload);
    });
  },
});

export const AddressActions = addressSlice.actions;
export { addressSlice };
