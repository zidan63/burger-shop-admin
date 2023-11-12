import { Role } from "@services/role";
import { BaseRecord } from "@types";

export type User = BaseRecord & {
  fullName: string;
  username: string;
  email: string;
  role: Role;
};

export type CreateUser = Omit<User, keyof BaseRecord>;

export type UpdateUser = Partial<CreateUser>;
