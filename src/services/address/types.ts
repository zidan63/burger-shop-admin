import { BaseRecord } from "@types";

export type Address = BaseRecord & {
  fullName: string;
  name: string;
  phone: string;
};

export type CreateAddress = Omit<Address, keyof BaseRecord>;
