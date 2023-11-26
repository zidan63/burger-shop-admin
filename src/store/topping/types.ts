import { BaseFilter } from "@types";
import { Topping } from "@services/topping";

export type ToppingFilter = BaseFilter & {
  id?: string;
  code?: string;
  name?: string;
  createdAtTo?: number;
  createdAtFrom?: number;
};

export type ToppingForm = {
  open: boolean;
  topping: Topping | null;
};
