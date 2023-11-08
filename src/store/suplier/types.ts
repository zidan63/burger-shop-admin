import { Suplier } from "@services/suplier";
import { BaseFilter } from "@types";

export type SuplierFilter = BaseFilter & {
  id?: string;
  name?: string;
  address?: string;
  phone?: string[];
  createdAtTo?: number;
  createdAtFrom?: number;
  updatedAtTo?: number;
  updatedAtFrom?: number;
};

export type SuplierForm = {
  open: boolean;
  suplier: Suplier | null;
};
