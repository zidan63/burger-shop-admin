import { Box } from "@mui/material";
import { User } from "@services/user";
import { useAppDispatch, useAppSelector } from "@store";
import { DataGridCustom } from "@components/_common/DataGridCustom";
import { Delete, Edit } from "@mui/icons-material";
import { UserActions, UserSelectors, UserThunks } from "@store/user";
import { NotificationUtil } from "@utils/NotificationUtil";
import { RoleSelectors } from "@store/role";

export const UserTable: React.FC = () => {
  const { users, totalUser } = useAppSelector(UserSelectors.getAll());
  const filter = useAppSelector(UserSelectors.getFilter());
  const table = useAppSelector(UserSelectors.getTable());
  const { roles } = useAppSelector(RoleSelectors.getAll());

  const dispatch = useAppDispatch();

  const handleEdit = (user: User) => {
    dispatch(
      UserActions.setForm({
        open: true,
        user: user,
      })
    );
  };

  const handleRemoveOneUser = async (user: User) => {
    const isAccept = await NotificationUtil.warning(
      `Bạn có chắc chắn muốn xóa người dùng ${user.code} ${user.fullName} này ?`
    );
    if (!isAccept) return;
    const result = await dispatch(UserThunks.delete(user.id));
    if (UserThunks.delete.rejected.match(result)) return;
    NotificationUtil.success("Đã xóa người dùng thành công");
  };

  const handlePageChange = async (page) => {
    dispatch(
      UserThunks.search({
        userFilter: {
          ...filter,
          page,
        },
      })
    );
  };

  const handlePageSizeChange = (pageSize) => {
    dispatch(
      UserThunks.search({
        userFilter: {
          ...filter,
          pageSize,
          page: 1,
        },
      })
    );
  };

  return (
    <Box>
      <DataGridCustom
        loading={table.loading}
        rowsData={users}
        columnsData={[
          {
            field: "code",
            headerName: "Mã người dùng",
            type: "text",
          },
          {
            field: "fullName",
            headerName: "Họ và tên",
            type: "text",
            sortComparator(_, __, a, b) {
              return a.order.localeCompare(b.order);
            },
            minWidth: 200,
            align: "left",
          },
          {
            field: "username",
            headerName: "Tên tài khoản",
            type: "text",
            align: "left",
          },

          {
            field: "roleIds",
            headerName: "Vai trò",
            type: "text",
            minWidth: 150,
            valueGetter: (params) => {
              const user: User = params.row;
              if (!roles.length) return user.roleDisplay;
              const role = roles.filter((role) => user.roleIds.includes(role.id));
              const roleDisplay = role.map((r) => r.name).join(", ");
              return roleDisplay;
            },
            sortComparator(_, __, a, b) {
              return a.level - b.level;
            },
          },
          {
            field: "phone",
            headerName: "Số điện thoại",
            type: "text",
          },

          {
            field: "isActive",
            headerName: "Trạng thái",
            type: "boolean",
            valueGetter: (params) => {
              const user: User = params.row;
              return user.isActive ? "Đang hoạt động" : "Dừng hoạt động";
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
        options={[
          {
            label: "Chỉnh sửa",
            icon: <Edit />,
            handleClick: (row) => handleEdit(row),
          },

          {
            label: "Xóa",
            icon: <Delete />,
            handleClick: (row) => handleRemoveOneUser(row),
            style: {
              color: "#dc3545",
            },
          },
        ]}
        pagination={{
          page: filter.page,
          pageSize: filter.pageSize,
          totalRecord: totalUser,
          onPageChange: handlePageChange,
          onPageSizeChange: handlePageSizeChange,
        }}
      />
    </Box>
  );
};
