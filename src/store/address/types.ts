import { Address } from "@services/address";
import { BaseFilter } from "@types";

export type AddressFilter = BaseFilter & {
  id?: string;
  name?: string;
  createdAtTo?: number;
  createdAtFrom?: number;
};

export type AddressForm = {
  open: boolean;
  address: Address | null;
};
