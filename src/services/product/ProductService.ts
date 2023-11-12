import { HttpRequest } from "@utils/HttpRequest";
import { CreateProduct, Product } from "./types";
import { ProductFilter } from "@store/product/types";
import { SearchResult } from "@types";

class ProductService {
  async search(productFilter?: ProductFilter) {
    return HttpRequest.get<SearchResult<Product>>(`/products`, productFilter);
  }

  async create(product: CreateProduct) {
    return HttpRequest.post<Product>("/products", product);
  }

  async update(product: Product) {
    return HttpRequest.put<Product>(`/products`, product);
  }

  async delete(id: string) {
    return HttpRequest.delete(`/products?id=${id}`);
  }
}

const productService = new ProductService();
export { productService };
