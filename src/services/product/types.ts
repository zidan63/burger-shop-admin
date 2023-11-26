import { BaseRecord } from "@types";
import { Category } from "@services/category";
import { Supplier } from "@services/supplier";
import { Topping } from "@services/topping";
import { User } from "@services/user";

export type Product = BaseRecord & {
  name: string;
  priceRecipt: number;
  priceSale: number;
  stock: number;
  description: string;
  imageName: string;
  toppings: Topping[];
  supplier: Supplier;
  category: Category;
  user: User;
};

export type CreateProduct = Omit<Product, keyof BaseRecord>;

export type UpdateProduct = Partial<CreateProduct>;
