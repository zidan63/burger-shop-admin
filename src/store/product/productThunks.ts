import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductFilter } from "./types";
import { SearchResult, SearchType } from "@types";
import { CreateProduct, Product, UpdateProduct } from "@services/product";
import { productService } from "@services/product/ProductService";

export const ProductThunks = {
  search: createAsyncThunk<
    SearchResult<Product>,
    { productFilter?: ProductFilter; isGetCount?: boolean }
  >("product/search", async (payload) => {
    return productService.search({ searchType: SearchType.NORMAL, ...payload.productFilter });
  }),

  create: createAsyncThunk<Product, CreateProduct>("product/create", async (product) => {
    return productService.create(product);
  }),

  update: createAsyncThunk<Product, Product>("product/update", async (payload) => {
    return productService.update(payload);
  }),

  delete: createAsyncThunk<string, string>("product/delete", async (productId) => {
    await productService.delete(productId);
    return productId;
  }),
};
