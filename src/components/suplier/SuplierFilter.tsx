import React from "react";
import { useAppDispatch, useAppSelector } from "@store";
import { FilterAdvance, FilterAdvanceSearchItemOptions } from "@components/_common/FilterAdvance";
import { SearchType } from "@types";
import { SuplierSelectors, SuplierThunks } from "@store/suplier";

export const SuplierFilter: React.FC = () => {
  const filter = useAppSelector(SuplierSelectors.getFilter());

  const dispatch = useAppDispatch();

  const handleSearch = (value: string) => {
    dispatch(
      SuplierThunks.search({
        isGetCount: true,
        suplierFilter: {
          page: 1,
          pageSize: filter.pageSize,
        },
      })
    );
  };

  const handleSearchAdvance = (values) => {
    dispatch(
      SuplierThunks.search({
        isGetCount: true,
        suplierFilter: {
          ...values,
          searchType: SearchType.ADVANCED,
          page: 1,
        },
      })
    );
  };

  function handleReset() {
    dispatch(SuplierThunks.search({ isGetCount: true }));
  }

  return (
    <FilterAdvance
      onSearch={handleSearch}
      onSearchAdvance={handleSearchAdvance}
      onReset={handleReset}
      searchItem={{
        label: "Tìm kiếm nhà cung cấp",
        placeholder:
          "Nhập mã nhà cung cấp, tên nhà cung cấp, địa chỉ nhà cung cấp, số điện thoại nhà cung cấp,... ",
      }}
      searchItemAdvances={[
        {
          field: "id",
          type: "text",
          label: "Mã nhà cung cấp",
          placeholder: "Ví dụ: 0001",
        },
        {
          field: "name",
          type: "text",
          label: "Tên nhà cung cấp",
          placeholder: "Ví dụ: Công ty A",
        },
        {
          field: "address",
          type: "text",
          label: "Địa chỉ nhà cung cấp",
          placeholder: "Ví dụ: 32/6 đường số 1 phường BHHA Quận Bình Tân",
        },
        {
          field: "phone",
          type: "text",
          label: "Số điện thoại",
          placeholder: "Ví dụ: 0923456897",
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
