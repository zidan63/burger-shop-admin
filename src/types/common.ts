import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type ReactFCP<T = any> = React.FC<React.PropsWithChildren<T>>;

export type BaseRecord = {
  id: string;
  createdAt: number;
  updatedAt: number;
  deletedAt: any;
};

export enum SearchType {
  ADVANCED = "ADVANCED",
  NORMAL = "NORMAL",
}

export type BaseFilter = {
  searchType?: SearchType;
  page?: number;
  pageSize?: number;
};

export type SearchResult<T> = {
  records: T[];
  totalRecord: number;
  pageCurrent: number;
};
