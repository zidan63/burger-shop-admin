import { Box } from "@mui/material";
import { User } from "@services/user";
import { useAppDispatch, useAppSelector } from "@store";
import { DataGridCustom } from "@components/_common/DataGridCustom";
import { Delete, Edit } from "@mui/icons-material";
import { NotificationUtil } from "@utils/NotificationUtil";
import { RoleSelectors } from "@store/role";
import { ProductActions, ProductSelectors, ProductThunks } from "@store/product";
import { Product } from "@services/product";
import { formatMoney } from "@utils/DateFormat";
import { Stack } from "@mui/system";
import { useEffect } from "react";

export const ProductTable: React.FC = () => {
  const { products, totalProduct } = useAppSelector(ProductSelectors.getAll());
  const filter = useAppSelector(ProductSelectors.getFilter());
  const table = useAppSelector(ProductSelectors.getTable());

  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("product ne", products);
  }, [products]);
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
        rowHeight={60}
        columnsData={[
          {
            field: "id",
            headerName: "Mã sản phẩm",
            type: "number",
          },
          {
            field: "imageName",
            headerName: "Hình ảnh",
            type: "object",
            renderCell(params) {
              const imageName = params.row.imageName;
              return imageName ? (
                <Box sx={{ width: "100%", p: 5, overflow: "hidden" }}>
                  <img
                    style={{ width: "100%", objectFit: "contain" }}
                    src={"/api/file/download?fileName=" + imageName}
                  />
                </Box>
              ) : (
                <></>
              );
            },
          },

          {
            field: "name",
            headerName: "Tên sản phẩm",
            type: "text",
            minWidth: 200,
          },
          {
            field: "priceRecipt",
            headerName: "Giá nhập",
            type: "number",
            valueGetter: (param) => formatMoney(param.row.priceRecipt),
            minWidth: 200,
          },
          {
            field: "priceSale",
            headerName: "Giá bán",
            type: "number",
            valueGetter: (param) => formatMoney(param.row.priceSale),
            minWidth: 200,
          },
          {
            field: "stock",
            headerName: "Số lượng",
            type: "number",
            minWidth: 200,
          },
          {
            field: "description",
            headerName: "Mô tả sản phẩm",
            type: "text",
            minWidth: 200,
          },
          {
            field: "category",
            headerName: "Loại",
            type: "object",
            valueGetter: (params) => params.row.category.name,
          },
          {
            field: "supplier",
            headerName: "Nhà cung cấp",
            type: "object",
            valueGetter: (params) => params.row.supplier.name,
            minWidth: 200,
          },
          {
            field: "user",
            headerName: "Người bán",
            type: "object",
            valueGetter: (params) => params.row.user.fullName,
            minWidth: 200,
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
