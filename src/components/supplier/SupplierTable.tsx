import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@store";
import { DataGridCustom } from "@components/_common/DataGridCustom";
import { Delete, Edit } from "@mui/icons-material";
import { NotificationUtil } from "@utils/NotificationUtil";
import { SupplierActions, SupplierSelectors, SupplierThunks } from "@store/supplier";
import { Supplier } from "@services/supplier";

export const SupplierTable: React.FC = () => {
  const { suppliers, totalSupplier } = useAppSelector(SupplierSelectors.getAll());
  const filter = useAppSelector(SupplierSelectors.getFilter());
  const table = useAppSelector(SupplierSelectors.getTable());

  const dispatch = useAppDispatch();

  const handleEdit = (supplier: Supplier) => {
    dispatch(
      SupplierActions.setForm({
        open: true,
        supplier: supplier,
      })
    );
  };

  const handleRemoveOneSupplier = async (supplier: Supplier) => {
    const isAccept = await NotificationUtil.warning(`Bạn có chắc chắn muốn xóa nhà cung cấp này ?`);
    if (!isAccept) return;
    const result = await dispatch(SupplierThunks.delete(supplier.id));
    if (SupplierThunks.delete.rejected.match(result)) return;
    NotificationUtil.success("Đã xóa nhà cung cấp thành công");
  };

  const handlePageChange = async (page) => {
    dispatch(
      SupplierThunks.search({
        supplierFilter: {
          ...filter,
          page,
        },
      })
    );
  };

  const handlePageSizeChange = (pageSize) => {
    dispatch(
      SupplierThunks.search({
        supplierFilter: {
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
        rowsData={suppliers}
        columnsData={[
          {
            field: "code",
            headerName: "Mã nhà cung cấp",
            type: "text",
          },
          {
            field: "name",
            headerName: "Tên nhà cung cấp",
            type: "text",
          },
          {
            field: "address",
            headerName: "Địa chỉ nhà cung cấp",
            type: "text",
          },
          {
            field: "phone",
            headerName: "Số điện thoại",
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
            handleClick: (row) => handleRemoveOneSupplier(row),
            style: {
              color: "#dc3545",
            },
          },
        ]}
        pagination={{
          page: filter.page,
          pageSize: filter.pageSize,
          totalRecord: totalSupplier,
          onPageChange: handlePageChange,
          onPageSizeChange: handlePageSizeChange,
        }}
      />
    </Box>
  );
};
