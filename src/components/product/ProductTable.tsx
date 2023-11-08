import { Box } from "@mui/material";
import { User } from "@services/user";
import { useAppDispatch, useAppSelector } from "@store";
import { DataGridCustom } from "@components/_common/DataGridCustom";
import { Delete, Edit } from "@mui/icons-material";
import { NotificationUtil } from "@utils/NotificationUtil";
import { RoleSelectors } from "@store/role";
import { ProductActions, ProductSelectors, ProductThunks } from "@store/product";
import { Product } from "@services/product";

export const ProductTable: React.FC = () => {
  const { products, totalProduct } = useAppSelector(ProductSelectors.getAll());
  const filter = useAppSelector(ProductSelectors.getFilter());
  const table = useAppSelector(ProductSelectors.getTable());

  const dispatch = useAppDispatch();

  const handleEdit = (product: Product) => {
    dispatch(
      ProductActions.setForm({
        open: true,
        product: product,
      })
    );
  };

  const handleRemoveOneProduct = async (product: Product) => {
    const isAccept = await NotificationUtil.warning(
      `Bạn có chắc chắn muốn xóa người dùng sản phẩm này ?`
    );
    if (!isAccept) return;
    const result = await dispatch(ProductThunks.delete(product.id));
    if (ProductThunks.delete.rejected.match(result)) return;
    NotificationUtil.success("Đã xóa sản phẩm thành công");
  };

  const handlePageChange = async (page) => {
    dispatch(
      ProductThunks.search({
        productFilter: {
          ...filter,
          page,
        },
      })
    );
  };

  const handlePageSizeChange = (pageSize) => {
    dispatch(
      ProductThunks.search({
        productFilter: {
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
        rowsData={products}
        columnsData={[
          {
            field: "code",
            headerName: "Mã sản phẩm",
            type: "text",
          },
          {
            field: "name",
            headerName: "Tên sản phẩm",
            type: "text",
            minWidth: 200,
            align: "left",
          },
          {
            field: "color",
            headerName: "Màu sản phẩm",
            type: "text",
            align: "left",
          },
          {
            field: "priceSale",
            headerName: "Giá sản phẩm",
            type: "text",
          },
          {
            field: "suplierId",
            headerName: "Nhà cung cấp",
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
            handleClick: (row) => handleRemoveOneProduct(row),
            style: {
              color: "#dc3545",
            },
          },
        ]}
        pagination={{
          page: filter.page,
          pageSize: filter.pageSize,
          totalRecord: totalProduct,
          onPageChange: handlePageChange,
          onPageSizeChange: handlePageSizeChange,
        }}
      />
    </Box>
  );
};
