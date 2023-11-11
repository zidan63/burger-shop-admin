import { BaseRecord } from "@types";

export type Category = BaseRecord & {
  id: string;
  name: string;
};

export type CreateCategory = Omit<Category, keyof BaseRecord>;

export type UpdateCategory = Partial<CreateCategory>;
