import React from "react";
import { useAppDispatch, useAppSelector } from "@store";
import { FilterAdvance, FilterAdvanceSearchItemOptions } from "@components/_common/FilterAdvance";
import { SearchType } from "@types";
import { ProductSelectors, ProductThunks } from "@store/product";

export const ProductFilter: React.FC = () => {
  const filter = useAppSelector(ProductSelectors.getFilter());

  const dispatch = useAppDispatch();

  const handleSearch = (value: string) => {
    dispatch(
      ProductThunks.search({
        isGetCount: true,
        productFilter: {
          page: 1,
          pageSize: filter.pageSize,
        },
      })
    );
  };

  const handleSearchAdvance = (values) => {
    dispatch(
      ProductThunks.search({
        isGetCount: true,
        productFilter: {
          ...values,
          searchType: SearchType.ADVANCED,
          page: 1,
        },
      })
    );
  };

  function handleReset() {
    dispatch(ProductThunks.search({ isGetCount: true }));
  }

  return (
    <FilterAdvance
      onSearch={handleSearch}
      onSearchAdvance={handleSearchAdvance}
      onReset={handleReset}
      searchItem={{
        label: "Tìm kiếm sản phẩm",
        placeholder: "Nhập mã sản phẩm, tên sản phẩm, màu sản phẩm, giá sản phẩm,... ",
      }}
      searchItemAdvances={[
        {
          field: "id",
          type: "text",
          label: "Mã sản phẩm",
          placeholder: "Ví dụ: 0001",
        },
        {
          field: "name",
          type: "text",
          label: "Tên sản phẩm",
          placeholder: "Ví dụ: Burger gà",
        },
        {
          field: "priceSale",
          type: "text",
          label: "Giá sản phẩm",
          placeholder: "Ví dụ: 30000",
        },
        {
          field: "supplierId",
          type: "options",
          label: "Nhà cung cấp",
          placeholder: "Ví dụ: Công ty A",
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
