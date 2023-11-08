import { HttpRequest } from "@utils/HttpRequest";
import { CreateProduct, UpdateProduct, Product } from "./types";
import { ProductFilter } from "@store/product/types";
import { ResultPaginationBookmark } from "@types";

class ProductService {
  async search(productFilter?: ProductFilter) {
    return HttpRequest.get<Product[]>(`/products/search`, productFilter);
  }

  async searchBookmark(productFilter?: ProductFilter) {
    return HttpRequest.get<ResultPaginationBookmark<Product>>(
      `/products/search-bookmark`,
      productFilter
    );
  }

  async count(productFilter?: ProductFilter) {
    return HttpRequest.get<{ count: number }>(`/products/count`, productFilter);
  }

  async create(product: CreateProduct) {
    return HttpRequest.post<Product>("/products", product);
  }

  async update(id: string, product: UpdateProduct) {
    return HttpRequest.patch<Product>(`/products/${id}`, product);
  }

  async delete(id: string) {
    return HttpRequest.delete(`/products/${id}`);
  }
}

const productService = new ProductService();
export { productService };
