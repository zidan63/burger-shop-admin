import { HttpRequest } from "@utils/HttpRequest";
import { CreateCategory, Category } from "./types";
import { CategoryFilter } from "@store/category/types";
import { SearchResult } from "@types";

class CategoryService {
  async search(categoryFilter?: CategoryFilter) {
    return HttpRequest.get<SearchResult<Category>>(`/categories`, categoryFilter);
  }

  async create(category: CreateCategory) {
    return HttpRequest.post<Category>("/categories", category);
  }

  async update(category: Category) {
    return HttpRequest.put<Category>(`/categories`, category);
  }

  async delete(id: string) {
    return HttpRequest.delete(`/categories?id=${id}`);
  }
}

const categoryService = new CategoryService();
export { categoryService };
