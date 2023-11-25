import { BaseRecord } from "@types";

export type Supplier = BaseRecord & {
  code: string;
  name: string;
  address: string;
  phone: string;
};

export type CreateSupplier = Omit<Supplier, keyof BaseRecord>;

export type UpdateSupplier = Partial<CreateSupplier>;
