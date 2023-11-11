import { BaseRecord } from "@types";

export type Product = BaseRecord & {
  id: string;
  name: string;
  color: string;
  suplierId: string;
  suplierDisplay: string;
};

export type CreateProduct = Omit<Product, keyof BaseRecord>;

export type UpdateProduct = Partial<CreateProduct>;
