import { Category } from "@services/category";
import { BaseFilter } from "@types";

export type CategoryFilter = BaseFilter & {
  id?: string;
  name?: string;
  createdAtTo?: number;
  createdAtFrom?: number;
};

export type CategoryForm = {
  open: boolean;
  category: Category | null;
};
