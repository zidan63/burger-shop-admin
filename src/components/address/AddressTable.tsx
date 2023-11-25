import { Box } from "@mui/material";
import { User } from "@services/user";
import { useAppDispatch, useAppSelector } from "@store";
import { DataGridCustom } from "@components/_common/DataGridCustom";
import { Delete, Edit } from "@mui/icons-material";
import { NotificationUtil } from "@utils/NotificationUtil";
import { RoleSelectors } from "@store/role";
import { AddressActions, AddressSelectors, AddressThunks } from "@store/address";
import { Address } from "@services/address";

export const AddressTable: React.FC = () => {
  const { addresses, totalAddress } = useAppSelector(AddressSelectors.getAll());
  const filter = useAppSelector(AddressSelectors.getFilter());
  const table = useAppSelector(AddressSelectors.getTable());

  const dispatch = useAppDispatch();

  const handleEdit = (address: Address) => {
    dispatch(
      AddressActions.setForm({
        open: true,
        address: address,
      })
    );
  };

  const handleRemoveOneAddress = async (address: Address) => {
    const isAccept = await NotificationUtil.warning(`Bạn có chắc chắn muốn xóa địa chỉ này ?`);
    if (!isAccept) return;
    const result = await dispatch(AddressThunks.delete(address.id));
    if (AddressThunks.delete.rejected.match(result)) return;
    NotificationUtil.success("Đã xóa địa chỉ thành công");
  };

  const handlePageChange = async (page) => {
    dispatch(
      AddressThunks.search({
        addressFilter: {
          ...filter,
          page,
        },
      })
    );
  };

  const handlePageSizeChange = (pageSize) => {
    dispatch(
      AddressThunks.search({
        addressFilter: {
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
        rowsData={addresses}
        columnsData={[
          {
            field: "id",
            headerName: "Mã địa chỉ",
            type: "text",
          },
          {
            field: "fullName",
            headerName: "Họ và tên",
            type: "text",
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
            handleClick: (row) => handleRemoveOneAddress(row),
            style: {
              color: "#dc3545",
            },
          },
        ]}
        pagination={{
          page: filter.page,
          pageSize: filter.pageSize,
          totalRecord: totalAddress,
          onPageChange: handlePageChange,
          onPageSizeChange: handlePageSizeChange,
        }}
      />
    </Box>
  );
};
