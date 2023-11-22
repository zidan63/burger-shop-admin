import { Category } from "@services/category";
import { Color } from "@services/color";
import { Suplier } from "@services/supplier";
import { User } from "@services/user";
import { BaseRecord } from "@types";

export type Product = BaseRecord & {
  name: string;
  priceRecipt: number;
  priceSale: number;
  stock: number;
  description: string;
  imageName: string;
  colors: Color[];
  suplier: Suplier;
  category: Category;
  user: User;
};

export type CreateProduct = Omit<Product, keyof BaseRecord>;

export type UpdateProduct = Partial<CreateProduct>;
