import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@store";
import { DataGridCustom } from "@components/_common/DataGridCustom";
import { Delete, Edit } from "@mui/icons-material";
import { NotificationUtil } from "@utils/NotificationUtil";
import { SuplierActions, SuplierSelectors, SuplierThunks } from "@store/suplier";
import { Suplier } from "@services/suplier";

export const SuplierTable: React.FC = () => {
  const { supliers, totalSuplier } = useAppSelector(SuplierSelectors.getAll());
  const filter = useAppSelector(SuplierSelectors.getFilter());
  const table = useAppSelector(SuplierSelectors.getTable());

  const dispatch = useAppDispatch();

  const handleEdit = (suplier: Suplier) => {
    dispatch(
      SuplierActions.setForm({
        open: true,
        suplier: suplier,
      })
    );
  };

  const handleRemoveOneSuplier = async (suplier: Suplier) => {
    const isAccept = await NotificationUtil.warning(`Bạn có chắc chắn muốn xóa nhà cung cấp này ?`);
    if (!isAccept) return;
    const result = await dispatch(SuplierThunks.delete(suplier.id));
    if (SuplierThunks.delete.rejected.match(result)) return;
    NotificationUtil.success("Đã xóa nhà cung cấp thành công");
  };

  const handlePageChange = async (page) => {
    dispatch(
      SuplierThunks.search({
        suplierFilter: {
          ...filter,
          page,
        },
      })
    );
  };

  const handlePageSizeChange = (pageSize) => {
    dispatch(
      SuplierThunks.search({
        suplierFilter: {
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
        rowsData={supliers}
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
            handleClick: (row) => handleRemoveOneSuplier(row),
            style: {
              color: "#dc3545",
            },
          },
        ]}
        pagination={{
          page: filter.page,
          pageSize: filter.pageSize,
          totalRecord: totalSuplier,
          onPageChange: handlePageChange,
          onPageSizeChange: handlePageSizeChange,
        }}
      />
    </Box>
  );
};
