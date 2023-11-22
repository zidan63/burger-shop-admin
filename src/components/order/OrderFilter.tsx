import React from "react";
import { useAppDispatch, useAppSelector } from "@store";
import { FilterAdvance, FilterAdvanceSearchItemOptions } from "@components/_common/FilterAdvance";
import { SearchType } from "@types";
import { CategorySelectors, CategoryThunks } from "@store/category";

export const OrderFilter: React.FC = () => {
  const filter = useAppSelector(CategorySelectors.getFilter());

  const dispatch = useAppDispatch();

  const handleSearch = (value: string) => {
    dispatch(
      CategoryThunks.search({
        categoryFilter: {
          page: 1,
          pageSize: filter.pageSize,
        },
      })
    );
  };

  const handleSearchAdvance = (values) => {
    dispatch(
      CategoryThunks.search({
        categoryFilter: {
          ...values,
          searchType: SearchType.ADVANCED,
          page: 1,
        },
      })
    );
  };

  function handleReset() {
    dispatch(CategoryThunks.search({}));
  }

  return (
    <FilterAdvance
      onSearch={handleSearch}
      onSearchAdvance={handleSearchAdvance}
      onReset={handleReset}
      searchItem={{
        label: "Tìm kiếm loại sản phẩm",
        placeholder: "Nhập mã loại sản phẩm, tên loại sản phẩm,... ",
      }}
      searchItemAdvances={[
        {
          field: "id",
          type: "text",
          label: "Mã loại sản phẩm",
          placeholder: "Ví dụ: 0001",
        },
        {
          field: "name",
          type: "text",
          label: "Tên loại sản phẩm",
          placeholder: "Ví dụ: Burger gà",
        },
        {
          field: "createdAtFrom",
          type: "date",
          label: "Ngày tạo từ ngày",
        },
        {
          field: "createdAtTo",
          type: "date",
          label: "Ngày tạo đến ngày",
        },
        {
          field: "updatedAtFrom",
          type: "date",
          label: "Ngày chỉnh sửa từ ngày",
        },
        {
          field: "updatedAtTo",
          type: "date",
          label: "Ngày chỉnh sửa đến ngày",
        },
      ]}
    />
  );
};
