import { HttpRequest } from "@utils/HttpRequest";
import { Order } from "./types";
import { OrderFilter } from "@store/order/types";
import { SearchResult } from "@types";

class OrderService {
  async search(orderFilter?: OrderFilter) {
    return HttpRequest.get<SearchResult<Order>>(`/orders`, orderFilter);
  }
  async statisticSearch(orderFilter?: OrderFilter) {
    return HttpRequest.get<SearchResult<Order>>(`/search/orders`, orderFilter);
  }
  async(orderFilter?: OrderFilter) {
    return HttpRequest.get<SearchResult<Order>>(`/orders`, orderFilter);
  }

  async update(order: Partial<Order>) {
    return HttpRequest.put<Order>(`/orders`, order);
  }

  async delete(id: string) {
    return HttpRequest.delete(`/orders?id=${id}`);
  }
}

const orderService = new OrderService();
export { orderService };
