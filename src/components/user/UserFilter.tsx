import React from "react";
import { useAppDispatch, useAppSelector } from "@store";
import { UserThunks } from "@store/user";
import { FilterAdvance, FilterAdvanceSearchItemOptions } from "@components/_common/FilterAdvance";

import { Role } from "@services/role";
import { RoleSelectors } from "@store/role";
import { SearchType } from "@types";

export const UserFilter: React.FC = () => {
  const { roles } = useAppSelector(RoleSelectors.getAll());

  const dispatch = useAppDispatch();

  const handleSearch = (value: string) => {
    dispatch(
      UserThunks.search({
        isGetCount: true,
        userFilter: {
          code: value,
          username: value,
          fullName: value,
          roleDisplay: value,
          workUnitDisplay: value,
          phone: value,
          email: value,
          page: 1,
        },
      })
    );
  };

  const handleSearchAdvance = (values) => {
    dispatch(
      UserThunks.search({
        isGetCount: true,
        userFilter: {
          ...values,
          searchType: SearchType.ADVANCED,
          page: 1,
        },
      })
    );
  };

  function handleReset() {
    dispatch(UserThunks.search({ isGetCount: true }));
  }

  return (
    <FilterAdvance
      onSearch={handleSearch}
      onSearchAdvance={handleSearchAdvance}
      onReset={handleReset}
      searchItem={{
        label: "Tìm kiếm người dùng",
        placeholder:
          "Nhập mã người dùng, tên người dùng, tên vai trò, tên đơn vị, số điện thoại, email,... ",
      }}
      searchItemAdvances={[
        {
          field: "code",
          type: "text",
          label: "Mã người dùng",
          placeholder: "Ví dụ: NV000001",
        },
        {
          field: "fullName",
          type: "text",
          label: "Họ và tên",
          placeholder: "Ví dụ: Nguyễn Văn A",
        },
        {
          field: "username",
          type: "text",
          label: "Tài khoản",
          placeholder: "Ví dụ: nguyenvana",
        },

        {
          field: "phone",
          type: "text",
          label: "Số điện thoại",
          placeholder: "Ví dụ: (084) 987 654 321",
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
          field: "roleIds",
          type: "options",
          label: "Vai trò",
          placeholder: "Ví dụ: (TP) Trưởng phòng",
          options: {
            options: roles,
            getOptionLabel: (option) => `(${option.code}) ${option.name}`,
            formatValueWhenSubmit: (option) => option.id,
          } as FilterAdvanceSearchItemOptions<Role>,
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
