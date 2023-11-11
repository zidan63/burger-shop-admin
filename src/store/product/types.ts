import { Product } from "@services/product/types";
import { User } from "@services/user";
import { BaseFilter } from "@types";

export type ProductFilter = BaseFilter & {
  id?: string;
  name?: string;
  color?: string;
  suplierId?: string;
  suplierDisplay?: string;
  createdAtTo?: number;
  createdAtFrom?: number;
};

export type ProductForm = {
  open: boolean;
  product: Product | null;
};
