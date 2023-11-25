import { createAsyncThunk } from "@reduxjs/toolkit";
import { SupplierFilter } from "./types";
import { SearchResult, SearchType } from "@types";
import { CreateSupplier, Supplier } from "@services/supplier";
import { supplierService } from "@services/supplier/SupplierService";

export const SupplierThunks = {
  search: createAsyncThunk<
    SearchResult<Supplier>,
    { supplierFilter?: SupplierFilter; isGetCount?: boolean }
  >("supplier/search", async (payload) => {
    return supplierService.search({ searchType: SearchType.NORMAL, ...payload.supplierFilter });
  }),

  create: createAsyncThunk<Supplier, CreateSupplier>("supplier/create", async (supplier) => {
    return supplierService.create(supplier);
  }),

  update: createAsyncThunk<Supplier, Supplier>("supplier/update", async (payload) => {
    return supplierService.update(payload);
  }),

  delete: createAsyncThunk<string, string>("supplier/delete", async (supplierId) => {
    await supplierService.delete(supplierId);
    return supplierId;
  }),
};
