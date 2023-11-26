import { BaseRecord } from "@types";

export type Topping = BaseRecord & {
  code: string;
  name: string;
};

export type CreateTopping = Omit<Topping, keyof BaseRecord>;

export type UpdateTopping = Partial<CreateTopping>;
