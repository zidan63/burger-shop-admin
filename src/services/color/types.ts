import { BaseRecord } from "@types";

export type Color = BaseRecord & {
  code: string;
  name: string;
};

export type CreateColor = Omit<Color, keyof BaseRecord>;

export type UpdateColor = Partial<CreateColor>;
