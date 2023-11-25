import { Order } from "@services/order";
import { BaseFilter } from "@types";

export type OrderFilter = BaseFilter & {
  id?: string;
  createdAtTo?: number;
  createdAtFrom?: number;
};

export type OrderForm = {
  open: boolean;
  order: Order | null;
};
