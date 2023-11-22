import { createAsyncThunk } from "@reduxjs/toolkit";
import { OrderFilter } from "./types";
import { SearchResult, SearchType } from "@types";
import { Order, CreateOrder } from "@services/order";
import { orderService } from "@services/order/OrderService";

export const OrderThunks = {
  search: createAsyncThunk<SearchResult<Order>, { orderFilter?: OrderFilter }>(
    "order/search",
    async (payload) => {
      return orderService.search({ searchType: SearchType.NORMAL, ...payload.orderFilter });
    }
  ),

  update: createAsyncThunk<Order, Order>("order/update", async (payload) => {
    return orderService.update(payload);
  }),

  delete: createAsyncThunk<string, string>("order/delete", async (orderId) => {
    await orderService.delete(orderId);
    return orderId;
  }),
};
