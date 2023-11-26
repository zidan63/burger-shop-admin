import { CreateTopping, Topping } from "./types";

import { HttpRequest } from "@utils/HttpRequest";
import { SearchResult } from "@types";
import { ToppingFilter } from "@store/topping/types";

class ToppingService {
  async search(toppingFilter?: ToppingFilter) {
    return HttpRequest.get<SearchResult<Topping>>(`/toppings`, toppingFilter);
  }

  async create(topping: CreateTopping) {
    return HttpRequest.post<Topping>("/toppings", topping);
  }

  async update(topping: Topping) {
    return HttpRequest.put<Topping>(`/toppings`, topping);
  }

  async delete(id: string) {
    return HttpRequest.delete(`/toppings?id=${id}`);
  }
}

const toppingService = new ToppingService();
export { toppingService };
