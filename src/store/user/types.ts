import { User } from "@services/user";
import { BaseFilter } from "@types";

export type UserFilter = BaseFilter & {
  code?: string;
  fullName?: string;
  username?: string;
  email?: string;
  phone?: string;
  roleDisplay?: string;
  workUnitDisplay?: string;
  roleIds?: string[];
  workUnitIds?: string[];
  createdAtTo?: number;
  createdAtFrom?: number;
};

export type UserForm = {
  open: boolean;
  user: User | null;
};
