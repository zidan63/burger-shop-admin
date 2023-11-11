import { Color } from "@services/color";
import { BaseFilter } from "@types";

export type ColorFilter = BaseFilter & {
  id?: string;
  code?: string;
  name?: string;
  createdAtTo?: number;
  createdAtFrom?: number;
};

export type ColorForm = {
  open: boolean;
  color: Color | null;
};
