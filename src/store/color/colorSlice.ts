import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ColorFilter, ColorForm } from "./types";
import { Color } from "@services/color";

export type ColorState = {
  colors: Color[];
  totalColor: number;
  filter: ColorFilter;
  form: ColorForm;
  table: {
    loading: boolean;
  };
  loading: boolean;
  error?: {
    code?: string;
    message?: string;
  };
};

const initialState: ColorState = {
  colors: [],
  totalColor: 0,
  filter: {
    page: 1,
    pageSize: 10,
  },
  form: {
    open: false,
    color: null,
  },
  table: {
    loading: false,
  },
  loading: false,
};

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<ColorForm>) => {
      state.form = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const ColorActions = colorSlice.actions;
export { colorSlice };
