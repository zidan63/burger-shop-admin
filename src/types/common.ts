import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type ReactFCP<T = any> = React.FC<React.PropsWithChildren<T>>;

export type BaseRecord = {
  id: string;
  docType: string;
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
  bookmark?: string;
};

export type ResultPaginationBookmark<T> = {
  records: T[];
  fetchedRecordsCount: number;
  bookmark: string;
};
