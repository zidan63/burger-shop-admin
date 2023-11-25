import { HttpRequest } from "@utils/HttpRequest";
import { CreateAddress, Address } from "./types";
import { AddressFilter } from "@store/address/types";
import { SearchResult } from "@types";

class AddressService {
  async search(addressFilter?: AddressFilter) {
    return HttpRequest.get<SearchResult<Address>>(`/categories`, addressFilter);
  }

  async create(address: CreateAddress) {
    return HttpRequest.post<Address>("/categories", address);
  }

  async update(address: Address) {
    return HttpRequest.put<Address>(`/categories`, address);
  }

  async delete(id: string) {
    return HttpRequest.delete(`/categories?id=${id}`);
  }
}

const addressService = new AddressService();
export { addressService };
