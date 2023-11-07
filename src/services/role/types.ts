import { BaseRecord } from "@types";

export type Role = BaseRecord & {
  code: string;
  name: string;
  level: number;
  maxAmountInOrg: number;
  permissionIds: string[];
  default: boolean;
  isActive: boolean;
};

export type CreateRole = Omit<Role, keyof BaseRecord | "default">;

export type UpdateRole = Partial<CreateRole>;
