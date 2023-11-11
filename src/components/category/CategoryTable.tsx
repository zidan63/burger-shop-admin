import { Box } from "@mui/material";
import { User } from "@services/user";
import { useAppDispatch, useAppSelector } from "@store";
import { DataGridCustom } from "@components/_common/DataGridCustom";
import { Delete, Edit } from "@mui/icons-material";
import { NotificationUtil } from "@utils/NotificationUtil";
import { RoleSelectors } from "@store/role";
import { CategoryActions, CategorySelectors, CategoryThunks } from "@store/category";
import { Category } from "@services/category";

export const CategoryTable: React.FC = () => {
  const { categories, totalCategory } = useAppSelector(CategorySelectors.getAll());
  const filter = useAppSelector(CategorySelectors.getFilter());
  const table = useAppSelector(CategorySelectors.getTable());

  const dispatch = useAppDispatch();

  const handleEdit = (category: Category) => {
    dispatch(
      CategoryActions.setForm({
        open: true,
        category: category,
      })
    );
  };

  const handleRemoveOneCategory = async (category: Category) => {
    const isAccept = await NotificationUtil.warning(
      `Bạn có chắc chắn muốn xóa loại sản phẩm này ?`
    );
    if (!isAccept) return;
    const result = await dispatch(CategoryThunks.delete(category.id));
    if (CategoryThunks.delete.rejected.match(result)) return;
    NotificationUtil.success("Đã xóa loại sản phẩm thành công");
  };

  const handlePageChange = async (page) => {
    dispatch(
      CategoryThunks.search({
        categoryFilter: {
          ...filter,
          page,
        },
      })
    );
  };

  const handlePageSizeChange = (pageSize) => {
    dispatch(
      CategoryThunks.search({
        categoryFilter: {
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
        rowsData={categories}
        columnsData={[
          {
            field: "id",
            headerName: "Mã loại sản phẩm",
            type: "text",
          },
          {
            field: "name",
            headerName: "Tên loại sản phẩm",
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
            handleClick: (row) => handleRemoveOneCategory(row),
            style: {
              color: "#dc3545",
            },
          },
        ]}
        pagination={{
          page: filter.page,
          pageSize: filter.pageSize,
          totalRecord: totalCategory,
          onPageChange: handlePageChange,
          onPageSizeChange: handlePageSizeChange,
        }}
      />
    </Box>
  );
};
