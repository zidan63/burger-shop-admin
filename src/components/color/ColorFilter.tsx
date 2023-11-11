import React from "react";
import { useAppDispatch, useAppSelector } from "@store";
import { FilterAdvance, FilterAdvanceSearchItemOptions } from "@components/_common/FilterAdvance";
import { SearchType } from "@types";
import { ColorSelectors, ColorThunks } from "@store/color";

export const ColorFilter: React.FC = () => {
  const filter = useAppSelector(ColorSelectors.getFilter());

  const dispatch = useAppDispatch();

  const handleSearch = (value: string) => {
    dispatch(
      ColorThunks.search({
        isGetCount: true,
        colorFilter: {
          page: 1,
          pageSize: filter.pageSize,
        },
      })
    );
  };

  const handleSearchAdvance = (values) => {
    dispatch(
      ColorThunks.search({
        isGetCount: true,
        colorFilter: {
          ...values,
          searchType: SearchType.ADVANCED,
          page: 1,
        },
      })
    );
  };

  function handleReset() {
    dispatch(ColorThunks.search({ isGetCount: true }));
  }

  return (
    <FilterAdvance
      onSearch={handleSearch}
      onSearchAdvance={handleSearchAdvance}
      onReset={handleReset}
      searchItem={{
        label: "Tìm kiếm màu",
        placeholder: "Nhập mã màu, tên màu,... ",
      }}
      searchItemAdvances={[
        {
          field: "code",
          type: "text",
          label: "Mã màu",
          placeholder: "Ví dụ: #CCC",
        },
        {
          field: "name",
          type: "text",
          label: "Tên màu",
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
      ]}
    />
  );
};
