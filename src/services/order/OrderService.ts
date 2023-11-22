import { HttpRequest } from "@utils/HttpRequest";
import { Order } from "./types";
import { OrderFilter } from "@store/order/types";
import { SearchResult } from "@types";

class OrderService {
  async search(orderFilter?: OrderFilter) {
    return HttpRequest.get<SearchResult<Order>>(`/categories`, orderFilter);
  }

  async update(_order: Order) {
    return HttpRequest.put<Order>(`/categories`, _order);
  }

  async delete(id: string) {
    return HttpRequest.delete(`/categories?id=${id}`);
  }
}

const orderService = new OrderService();
export { orderService };
