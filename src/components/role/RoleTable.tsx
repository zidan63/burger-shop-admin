import { Box } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { DataGridCustom } from "@components/_common/DataGridCustom";
import { Role } from "@services/role";
import { useAppDispatch, useAppSelector } from "@store";
import { RoleActions, RoleSelectors, RoleThunks } from "@store/role";
import { NotificationUtil } from "@utils/NotificationUtil";

export const RoleTable = () => {
  const { roles, totalRole } = useAppSelector(RoleSelectors.getAll());
  const filter = useAppSelector(RoleSelectors.getFilter());
  const table = useAppSelector(RoleSelectors.getTable());

  const dispatch = useAppDispatch();

  const handleEdit = (role: Role) => {
    dispatch(
      RoleActions.setForm({
        open: true,
        role: role,
      })
    );
  };

  const handleRemoveOneRole = async (role: any) => {
    const accept = await NotificationUtil.warning(
      `Bạn có chắc chắn muốn xóa vai trò ${role.code} ${role.name} này ?`
    );

    if (accept) {
      const result = await dispatch(RoleThunks.delete(role.id));

      if (RoleThunks.delete.rejected.match(result)) return;
      NotificationUtil.success("Đã xóa vai trò thành công");
    }
  };

  const handlePageChange = async (page) => {
    dispatch(
      RoleThunks.search({
        roleFilter: {
          ...filter,
          page,
        },
      })
    );
  };

  const handlePageSizeChange = (pageSize) => {
    dispatch(
      RoleThunks.search({
        roleFilter: {
          ...filter,
          pageSize,
        },
      })
    );
  };

  return (
    <Box>
      <DataGridCustom
        loading={table.loading}
        rowsData={roles}
        columnsData={[
          {
            field: "code",
            headerName: "Mã vai trò",
            type: "text",
          },
          {
            field: "name",
            headerName: "Tên vai trò",
            type: "text",
          },
          {
            field: "level",
            headerName: "Độ ưu tiên",
            type: "number",
          },
          {
            field: "maxAmountInOrg",
            headerName: "SLTĐ/TC",
            type: "number",
          },
          {
            field: "isActive",
            headerName: "Trạng thái",
            type: "boolean",
            valueGetter: (params) => {
              const role: Role = params.row;
              return role.isActive ? "Đang hoạt động" : "Dừng hoạt động";
            },
          },

          {
            field: "createdAt",
            headerName: "Ngày tạo",
            type: "date",
          },
          {
            field: "updatedAt",
            headerName: "Ngày chỉnh sửa",
            type: "date",
          },
        ]}
        options={(row) => [
          {
            label: "Chỉnh sửa",
            icon: <Edit />,
            handleClick: (row: Role) => handleEdit(row),
          },

          {
            label: "Xóa",
            icon: <Delete />,
            handleClick: (row: Role) => handleRemoveOneRole(row),
            style: {
              color: "#dc3545",
            },
          },
        ]}
        pagination={{
          page: filter.page,
          pageSize: filter.pageSize,
          totalRecord: totalRole,
          onPageChange: handlePageChange,
          onPageSizeChange: handlePageSizeChange,
        }}
      />
    </Box>
  );
};
