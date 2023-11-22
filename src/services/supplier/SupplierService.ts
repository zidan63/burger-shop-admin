import { HttpRequest } from "@utils/HttpRequest";
import { CreateSupplier, Supplier } from "./types";
import { SupplierFilter } from "@store/supplier/types";
import { SearchResult } from "@types";

class SupplierService {
  async search(supplierFilter?: SupplierFilter) {
    return HttpRequest.get<SearchResult<Supplier>>(`/suppliers`, supplierFilter);
  }

  async create(supplier: CreateSupplier) {
    return HttpRequest.post<Supplier>("/suppliers", supplier);
  }

  async update(supplier: Supplier) {
    return HttpRequest.put<Supplier>(`/suppliers`, supplier);
  }

  async delete(id: string) {
    return HttpRequest.delete(`/suppliers?id=${id}`);
  }
}

const supplierService = new SupplierService();
export { supplierService };
