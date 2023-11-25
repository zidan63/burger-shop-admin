import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { OrderFilter, OrderForm } from "./types";
import { Order } from "@services/order";
import { OrderThunks } from "./orderThunks";

export type OrderState = {
  orders: Order[];
  totalOrder: number;
  filter: OrderFilter;
  form: OrderForm;
  table: {
    loading: boolean;
  };
  loading: boolean;
  error?: {
    code?: string;
    message?: string;
  };
};

const initialState: OrderState = {
  orders: [],
  totalOrder: 0,
  filter: {
    page: 1,
    pageSize: 10,
  },
  form: {
    open: false,
    order: null,
  },
  table: {
    loading: false,
  },
  loading: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<OrderForm>) => {
      state.form = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(OrderThunks.search.pending, (state, action) => {
        state.table.loading = true;
        if (!action.meta.arg.orderFilter) state.filter = initialState.filter;
        else state.filter = { ...action.meta.arg.orderFilter };
      })
      .addCase(OrderThunks.search.fulfilled, (state, action) => {
        state.orders = action.payload.records;
        state.totalOrder = action.payload.totalRecord;
        state.filter.page = action.payload.pageCurrent;
        state.table.loading = false;
      })
      .addCase(OrderThunks.search.rejected, (state) => {
        state.table.loading = false;
      });

    builder
      .addCase(OrderThunks.statisticSearch.pending, (state, action) => {
        state.table.loading = true;
        if (!action.meta.arg.orderFilter) state.filter = initialState.filter;
        else state.filter = { ...action.meta.arg.orderFilter };
      })
      .addCase(OrderThunks.statisticSearch.fulfilled, (state, action) => {
        state.orders = action.payload.records;
        state.totalOrder = action.payload.totalRecord;
        state.filter.page = action.payload.pageCurrent;
        state.table.loading = false;
      })
      .addCase(OrderThunks.statisticSearch.rejected, (state) => {
        state.table.loading = false;
      });

    builder.addCase(OrderThunks.update.fulfilled, (state, action) => {
      state.form = { open: false, order: null };
      state.orders = state.orders.map((c) => {
        if (c.id === action.payload.id) return action.payload;
        return c;
      });
    });

    builder.addCase(OrderThunks.delete.fulfilled, (state, action) => {
      state.orders = state.orders.filter((c) => c.id !== action.payload);
    });
  },
});

export const OrderActions = orderSlice.actions;
export { orderSlice };
