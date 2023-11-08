import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SuplierFilter, SuplierForm } from "./types";
import { Suplier } from "@services/suplier";

export type SuplierState = {
  supliers: Suplier[];
  totalSuplier: number;
  filter: SuplierFilter;
  form: SuplierForm;
  table: {
    loading: boolean;
  };
  loading: boolean;
  error?: {
    code?: string;
    message?: string;
  };
};

const initialState: SuplierState = {
  supliers: [],
  totalSuplier: 0,
  filter: {
    page: 1,
    pageSize: 10,
  },
  form: {
    open: false,
    suplier: null,
  },
  table: {
    loading: false,
  },
  loading: false,
};

const suplierSlice = createSlice({
  name: "suplier",
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<SuplierForm>) => {
      state.form = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const SuplierActions = suplierSlice.actions;
export { suplierSlice };
