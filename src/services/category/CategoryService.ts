import { HttpRequest } from "@utils/HttpRequest";
import { CreateCategory, UpdateCategory, Category } from "./types";
import { ResultPaginationBookmark } from "@types";
import { CategoryFilter } from "@store/category/types";

class CategoryService {
  async search(categoryFilter?: CategoryFilter) {
    return HttpRequest.get<Category[]>(`/categories/search`, categoryFilter);
  }

  async searchBookmark(categoryFilter?: CategoryFilter) {
    return HttpRequest.get<ResultPaginationBookmark<Category>>(
      `/categories/search-bookmark`,
      categoryFilter
    );
  }

  async count(categoryFilter?: CategoryFilter) {
    return HttpRequest.get<{ count: number }>(`/categories/count`, categoryFilter);
  }

  async create(category: CreateCategory) {
    return HttpRequest.post<Category>("/categories", category);
  }

  async update(id: string, category: UpdateCategory) {
    return HttpRequest.patch<Category>(`/categories/${id}`, category);
  }

  async delete(id: string) {
    return HttpRequest.delete(`/categories/${id}`);
  }
}

const categoryService = new CategoryService();
export { categoryService };
