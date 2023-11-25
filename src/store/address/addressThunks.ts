import { createAsyncThunk } from "@reduxjs/toolkit";
import { AddressFilter } from "./types";
import { SearchResult, SearchType } from "@types";
import { Address, CreateAddress } from "@services/address";
import { addressService } from "@services/address/AddressService";

export const AddressThunks = {
  search: createAsyncThunk<SearchResult<Address>, { addressFilter?: AddressFilter }>(
    "address/search",
    async (payload) => {
      return addressService.search({ searchType: SearchType.NORMAL, ...payload.addressFilter });
    }
  ),

  create: createAsyncThunk<Address, CreateAddress>("address/create", async (address) => {
    return addressService.create(address);
  }),

  update: createAsyncThunk<Address, Address>("address/update", async (payload) => {
    return addressService.update(payload);
  }),

  delete: createAsyncThunk<string, string>("address/delete", async (addressId) => {
    await addressService.delete(addressId);
    return addressId;
  }),
};
