import { FilterAdvance, FilterAdvanceSearchItemOptions } from "@components/_common/FilterAdvance";
import { ToppingSelectors, ToppingThunks } from "@store/topping";
import { useAppDispatch, useAppSelector } from "@store";

import React from "react";
import { SearchType } from "@types";

export const ToppingFilter: React.FC = () => {
  const filter = useAppSelector(ToppingSelectors.getFilter());

  const dispatch = useAppDispatch();

  const handleSearch = (value: string) => {
    dispatch(
      ToppingThunks.search({
        toppingFilter: {
          page: 1,
          pageSize: filter.pageSize,
        },
      })
    );
  };

  const handleSearchAdvance = (values) => {
    dispatch(
      ToppingThunks.search({
        toppingFilter: {
          ...values,
          searchType: SearchType.ADVANCED,
          page: 1,
        },
      })
    );
  };

  function handleReset() {
    dispatch(ToppingThunks.search({}));
  }

  return (
    <FilterAdvance
      onSearch={handleSearch}
      onSearchAdvance={handleSearchAdvance}
      onReset={handleReset}
      searchItem={{
        label: "Tìm kiếm topping",
        placeholder: "Nhập mã topping, tên topping,... ",
      }}
      searchItemAdvances={[
        {
          field: "code",
          type: "text",
          label: "Mã màu topping",
          placeholder: "Ví dụ: #00000",
        },
        {
          field: "name",
          type: "text",
          label: "Tên topping",
          placeholder: "Ví dụ: Màu xám",
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
