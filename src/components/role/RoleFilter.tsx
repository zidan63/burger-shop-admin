import React from "react";

import { useAppDispatch, useAppSelector } from "@store";
import { RoleSelectors, RoleThunks } from "@store/role";
import { FilterAdvance } from "@components/_common/FilterAdvance";
import { SearchType } from "@types";

export const RoleFilter: React.FC = () => {
  const filter = useAppSelector(RoleSelectors.getFilter());

  const dispatch = useAppDispatch();

  const handleSearch = (value: string) => {
    dispatch(
      RoleThunks.search({
        isGetCount: true,
        roleFilter: {
          code: value,
          name: value,
          page: 1,
          pageSize: filter.pageSize,
        },
      })
    );
  };

  const handleSearchAdvance = (values) => {
    dispatch(
      RoleThunks.search({
        isGetCount: true,
        roleFilter: {
          ...filter,
          ...values,
          searchType: SearchType.ADVANCED,
          page: 1,
        },
      })
    );
  };

  function handleReset() {
    dispatch(RoleThunks.search({ isGetCount: true }));
  }

  return (
    <FilterAdvance
      onSearch={handleSearch}
      onSearchAdvance={handleSearchAdvance}
      onReset={handleReset}
      searchItem={{
        label: "Tìm kiếm vai trò",
        placeholder: "Nhập mã vai trò, tên vai trò,... ",
      }}
      searchItemAdvances={[
        {
          field: "code",
          type: "text",
          label: "Mã vai trò",
          placeholder: "Ví dụ: NV000001",
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
          field: "name",
          type: "text",
          label: "Tên vai trò",
          placeholder: "Ví dụ: Phó đội trưởng",
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
