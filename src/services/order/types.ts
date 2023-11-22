import { BaseRecord } from "@types";

export type Order = BaseRecord & {
  code: string;
  name: string;
};

export type CreateOrder = Omit<Order, keyof BaseRecord>;
