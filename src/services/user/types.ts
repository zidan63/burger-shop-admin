import { BaseRecord } from "@types";

export type User = BaseRecord & {
  code: string;
  fullName: string;
  phone: string;
  email: string;
  roleIds: string[];
  roleDisplay: string;
  workUnitId: string;
  workUnitDisplay: string;
  username: string;
  password: string;
  level: number;
  order: string;
  isActive: boolean;
};

export type CreateUser = Omit<User, keyof BaseRecord>;

export type UpdateUser = Partial<CreateUser>;
