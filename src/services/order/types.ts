import { Address } from "@services/address";
import { Product } from "@services/product";
import { User } from "@services/user";
import { BaseRecord } from "@types";

export type OrderDetail = BaseRecord & {
  amount: number;
  bill: number;
  priceSaleBill: number;
  product: Product;
};
export type Order = BaseRecord & {
  address: Address;
  billDetails: OrderDetail[];
  status: number | string;
  user: User;
  employee: User;
};

export enum Status {
  PENDING = 0,
  CANCELLED = 1,
  COMPLETED = 2,
}

export type CreateOrder = Omit<Order, keyof BaseRecord>;
