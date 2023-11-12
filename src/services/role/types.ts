import { BaseRecord } from "@types";

export type Permission = BaseRecord & {
  code: string;
};

export type Role = BaseRecord & {
  code: string;
  name: string;
  permissions: Permission[];
};

export type CreateRole = Omit<Role, keyof BaseRecord>;

export type UpdateRole = Partial<CreateRole>;
