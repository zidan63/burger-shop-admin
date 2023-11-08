import { BaseRecord } from "@types";

export type Product = BaseRecord & {
  id: string;
  name: string;
  color: string;
  suplierId: string;
  suplierDisplay: string;
  createdAtTo: number;
  createdAtFrom: number;
  updatedAtTo: number;
  updatedAtFrom: number;
};

export type CreateProduct = Omit<Product, keyof BaseRecord>;

export type UpdateProduct = Partial<CreateProduct>;
