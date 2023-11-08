import { HttpRequest } from "@utils/HttpRequest";
import { CreateSuplier, UpdateSuplier, Suplier } from "./types";
import { ProductFilter } from "@store/product/types";
import { ResultPaginationBookmark } from "@types";
import { SuplierFilter } from "@store/suplier/types";

class SuplierService {
  async search(suplierFilter?: SuplierFilter) {
    return HttpRequest.get<Suplier[]>(`/supliers/search`, suplierFilter);
  }

  async searchBookmark(suplierFilter?: SuplierFilter) {
    return HttpRequest.get<ResultPaginationBookmark<Suplier>>(
      `/supliers/search-bookmark`,
      suplierFilter
    );
  }

  async count(suplierFilter?: SuplierFilter) {
    return HttpRequest.get<{ count: number }>(`/supliers/count`, suplierFilter);
  }

  async create(product: CreateSuplier) {
    return HttpRequest.post<Suplier>("/supliers", product);
  }

  async update(id: string, product: UpdateSuplier) {
    return HttpRequest.patch<Suplier>(`/supliers/${id}`, product);
  }

  async delete(id: string) {
    return HttpRequest.delete(`/supliers/${id}`);
  }
}

const suplierService = new SuplierService();
export { suplierService };
