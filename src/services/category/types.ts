import { BaseRecord } from "@types";

export type Category = BaseRecord & {
  code: string;
  name: string;
};

export type CreateCategory = Omit<Category, keyof BaseRecord>;
