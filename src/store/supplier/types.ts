import { Supplier } from "@services/supplier";
import { BaseFilter } from "@types";

export type SupplierFilter = BaseFilter & {
  id?: string;
  name?: string;
  address?: string;
  phone?: string[];
  createdAtTo?: number;
  createdAtFrom?: number;
};

export type SupplierForm = {
  open: boolean;
  supplier: Supplier | null;
};
