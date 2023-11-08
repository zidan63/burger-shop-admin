import { createAsyncThunk } from "@reduxjs/toolkit";
import { SuplierFilter } from "./types";
import { SearchType } from "@types";
import { CreateSuplier, Suplier, UpdateSuplier } from "@services/suplier";
import { suplierService } from "@services/suplier/SuplierService";

export const SuplierThunks = {
  search: createAsyncThunk<Suplier[], { suplierFilter?: SuplierFilter; isGetCount?: boolean }>(
    "suplier/search",
    async (payload) => {
      return suplierService.search({ searchType: SearchType.NORMAL, ...payload.suplierFilter });
    }
  ),

  create: createAsyncThunk<Suplier, CreateSuplier>("suplier/create", async (suplier) => {
    return suplierService.create(suplier);
  }),

  update: createAsyncThunk<Suplier, { id: string; suplier: UpdateSuplier }>(
    "suplier/update",
    async (payload) => {
      return suplierService.update(payload.id, payload.suplier);
    }
  ),

  delete: createAsyncThunk<string, string>("suplier/delete", async (suplierId) => {
    await suplierService.delete(suplierId);
    return suplierId;
  }),
};
