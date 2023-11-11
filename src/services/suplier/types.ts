import { BaseRecord } from "@types";

export type Suplier = BaseRecord & {
  id: string;
  name: string;
  address: string;
  phone: string;
};

export type CreateSuplier = Omit<Suplier, keyof BaseRecord>;

export type UpdateSuplier = Partial<CreateSuplier>;
