import { HttpRequest } from "@utils/HttpRequest";
import { CreateSuplier, Suplier } from "./types";
import { SuplierFilter } from "@store/suplier/types";
import { SearchResult } from "@types";

class SuplierService {
  async search(suplierFilter?: SuplierFilter) {
    return HttpRequest.get<SearchResult<Suplier>>(`/supliers`, suplierFilter);
  }

  async create(suplier: CreateSuplier) {
    return HttpRequest.post<Suplier>("/supliers", suplier);
  }

  async update(suplier: Suplier) {
    return HttpRequest.put<Suplier>(`/supliers`, suplier);
  }

  async delete(id: string) {
    return HttpRequest.delete(`/supliers?id=${id}`);
  }
}

const suplierService = new SuplierService();
export { suplierService };
