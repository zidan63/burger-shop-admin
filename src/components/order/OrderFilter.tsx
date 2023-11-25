import React from "react";
import { useAppDispatch, useAppSelector } from "@store";
import { FilterAdvance, FilterAdvanceSearchItemOptions } from "@components/_common/FilterAdvance";
import { SearchType } from "@types";
import { OrderSelectors, OrderThunks } from "@store/order";

export const OrderFilter: React.FC = () => {
  const filter = useAppSelector(OrderSelectors.getFilter());

  const dispatch = useAppDispatch();

  const handleSearch = (value: string) => {
    dispatch(
      OrderThunks.search({
        orderFilter: {
          page: 1,
          pageSize: filter.pageSize,
        },
      })
    );
  };

  const handleSearchAdvance = (values) => {
    dispatch(
      OrderThunks.search({
        orderFilter: {
          ...values,
          searchType: SearchType.ADVANCED,
          page: 1,
        },
      })
    );
  };

  function handleReset() {
    dispatch(OrderThunks.search({}));
  }

  return (
    <FilterAdvance
      onSearch={handleSearch}
      onSearchAdvance={handleSearchAdvance}
      onReset={handleReset}
      searchItem={{
        label: "Tìm kiếm đơn hàng",
        placeholder: "Nhập mã đơn, tên khách hàng... ",
      }}
      searchItemAdvances={[
        {
          field: "id",
          type: "text",
          label: "Mã đơn",
          placeholder: "Ví dụ: 0001",
        },
        {
          field: "fullName",
          type: "text",
          label: "Tên khách hàng",
          placeholder: "Ví dụ: Nguyễn A",
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
