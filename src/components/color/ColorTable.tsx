import { Box } from "@mui/material";
import { User } from "@services/user";
import { useAppDispatch, useAppSelector } from "@store";
import { DataGridCustom } from "@components/_common/DataGridCustom";
import { Delete, Edit } from "@mui/icons-material";
import { NotificationUtil } from "@utils/NotificationUtil";
import { RoleSelectors } from "@store/role";
import { ColorActions, ColorSelectors, ColorThunks } from "@store/color";
import { Color } from "@services/color";

export const ColorTable: React.FC = () => {
  const { colors, totalColor } = useAppSelector(ColorSelectors.getAll());
  const filter = useAppSelector(ColorSelectors.getFilter());
  const table = useAppSelector(ColorSelectors.getTable());

  const dispatch = useAppDispatch();

  const handleEdit = (color: Color) => {
    dispatch(
      ColorActions.setForm({
        open: true,
        color: color,
      })
    );
  };

  const handleRemoveOneColor = async (color: Color) => {
    const isAccept = await NotificationUtil.warning(
      `Bạn có chắc chắn muốn xóa loại sản phẩm này ?`
    );
    if (!isAccept) return;
    const result = await dispatch(ColorThunks.delete(color.id));
    if (ColorThunks.delete.rejected.match(result)) return;
    NotificationUtil.success("Đã xóa loại sản phẩm thành công");
  };

  const handlePageChange = async (page) => {
    dispatch(
      ColorThunks.search({
        colorFilter: {
          ...filter,
          page,
        },
      })
    );
  };

  const handlePageSizeChange = (pageSize) => {
    dispatch(
      ColorThunks.search({
        colorFilter: {
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
        rowsData={colors}
        columnsData={[
          {
            field: "code",
            headerName: "Mã màu",
            type: "text",
          },
          {
            field: "name",
            headerName: "Tên màu",
            type: "text",
          },
          {
            field: "createdAt",
            headerName: "Ngày tạo",
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
            handleClick: (row) => handleRemoveOneColor(row),
            style: {
              color: "#dc3545",
            },
          },
        ]}
        pagination={{
          page: filter.page,
          pageSize: filter.pageSize,
          totalRecord: totalColor,
          onPageChange: handlePageChange,
          onPageSizeChange: handlePageSizeChange,
        }}
      />
    </Box>
  );
};
