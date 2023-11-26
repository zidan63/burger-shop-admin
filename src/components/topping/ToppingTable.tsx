import { Delete, Edit } from "@mui/icons-material";
import { ToppingActions, ToppingSelectors, ToppingThunks } from "@store/topping";
import { useAppDispatch, useAppSelector } from "@store";

import { Box } from "@mui/material";
import { DataGridCustom } from "@components/_common/DataGridCustom";
import { NotificationUtil } from "@utils/NotificationUtil";
import { Stack } from "@mui/system";
import { Topping } from "@services/topping";

export const ToppingTable: React.FC = () => {
  const { toppings, totalTopping } = useAppSelector(ToppingSelectors.getAll());
  const filter = useAppSelector(ToppingSelectors.getFilter());
  const table = useAppSelector(ToppingSelectors.getTable());

  const dispatch = useAppDispatch();

  const handleEdit = (topping: Topping) => {
    dispatch(
      ToppingActions.setForm({
        open: true,
        topping: topping,
      })
    );
  };

  const handleRemoveOneTopping = async (topping: Topping) => {
    const isAccept = await NotificationUtil.warning(`Bạn có chắc chắn muốn xóa topping này ?`);
    if (!isAccept) return;
    const result = await dispatch(ToppingThunks.delete(topping.id));
    if (ToppingThunks.delete.rejected.match(result)) return;
    NotificationUtil.success("Đã xóa topping thành công");
  };

  const handlePageChange = async (page) => {
    dispatch(
      ToppingThunks.search({
        toppingFilter: {
          ...filter,
          page,
        },
      })
    );
  };

  const handlePageSizeChange = (pageSize) => {
    dispatch(
      ToppingThunks.search({
        toppingFilter: {
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
        rowsData={toppings}
        columnsData={[
          {
            field: "code",
            headerName: "Mã màu topping",
            type: "text",
            renderCell(params) {
              const code = params.row.code;
              return (
                <Stack direction={"row"}>
                  <Box
                    sx={{
                      backgroundTopping: code,
                      width: 20,
                      height: 20,
                      borderRadius: 20,
                      mr: 1,
                    }}
                  ></Box>
                  {code}
                </Stack>
              );
            },
          },
          {
            field: "name",
            headerName: "Tên topping",
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
            handleClick: (row) => handleRemoveOneTopping(row),
            style: {
              topping: "#dc3545",
            },
          },
        ]}
        pagination={{
          page: filter.page,
          pageSize: filter.pageSize,
          totalRecord: totalTopping,
          onPageChange: handlePageChange,
          onPageSizeChange: handlePageSizeChange,
        }}
      />
    </Box>
  );
};
