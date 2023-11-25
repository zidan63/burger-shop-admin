import { Box } from "@mui/material";
import { User } from "@services/user";
import { useAppDispatch, useAppSelector } from "@store";
import { DataGridCustom } from "@components/_common/DataGridCustom";
import { Approval, Delete, Details, Edit } from "@mui/icons-material";
import { NotificationUtil } from "@utils/NotificationUtil";
import { RoleSelectors } from "@store/role";
import { CategoryActions, CategorySelectors, CategoryThunks } from "@store/category";
import { Category } from "@services/category";
import { OrderActions, OrderSelectors, OrderThunks } from "@store/order";
import { useEffect } from "react";
import { Order, Status } from "@services/order";
import { formatCurrency } from "@utils/StringFormat";

export const OrderTable: React.FC = () => {
  const { orders, totalOrder } = useAppSelector(OrderSelectors.getAll());
  const filter = useAppSelector(OrderSelectors.getFilter());
  const table = useAppSelector(OrderSelectors.getTable());

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("order ne", orders);
  }, [orders]);

  const handleApprove = async (order) => {
    const newOrder: Partial<Order> = {
      id: order.id,
      status: Status[Status.COMPLETED],
    };
    const result = await dispatch(OrderThunks.update(newOrder));
  };

  const handleCancel = async (order: Order) => {
    const newOrder: Partial<Order> = {
      id: order.id,
      status: Status[Status.CANCELLED],
    };
    const result = await dispatch(OrderThunks.update(newOrder));
    console.log(order);
  };

  const handleDetail = (order: Order) => {
    dispatch(
      OrderActions.setForm({
        open: true,
        order: order || null,
      })
    );
  };

  // const handleRemoveOneCategory = async (category: Category) => {
  //   const isAccept = await NotificationUtil.warning(
  //     `Bạn có chắc chắn muốn xóa loại sản phẩm này ?`
  //   );
  //   if (!isAccept) return;
  //   const result = await dispatch(CategoryThunks.delete(category.id));
  //   if (CategoryThunks.delete.rejected.match(result)) return;
  //   NotificationUtil.success("Đã xóa loại sản phẩm thành công");
  // };

  const handlePageChange = async (page) => {
    // dispatch(
    //   CategoryThunks.search({
    //     categoryFilter: {
    //       ...filter,
    //       page,
    //     },
    //   })
    // );
  };

  const getTotalPrice = (order: Order): string => {
    return formatCurrency(
      "USD",
      order.billDetails.reduce((acc, billDetail) => {
        return acc + billDetail.amount * billDetail.priceSaleBill;
      }, 0)
    );
  };

  const handlePageSizeChange = (pageSize) => {
    // dispatch(
    //   CategoryThunks.search({
    //     categoryFilter: {
    //       ...filter,
    //       pageSize,
    //       page: 1,
    //     },
    //   })
    // );
  };

  return (
    <Box>
      <DataGridCustom
        loading={table.loading}
        rowsData={orders || []}
        columnsData={[
          {
            field: "id",
            headerName: "Mã hoá đơn",
            type: "text",
          },
          {
            field: "fullName",
            headerName: "Người mua",
            valueGetter: (param) => param.row.address.fullName,
            type: "text",
          },
          {
            field: "status",
            headerName: "Trạng thái",
            valueGetter: (param) => param.row.status,
            type: "text",
          },
          {
            field: "total",
            headerName: "Tổng tiền",
            valueGetter: (param) => getTotalPrice(param.row),
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
            label: "Chấp nhận đơn hàng",
            icon: <Approval />,
            style: {
              color: "#00cc66",
            },
            handleClick: (row) => handleApprove(row),
          },
          {
            label: "Huỷ đơn hàng",
            icon: <Delete />,
            handleClick: (row) => handleCancel(row),
            style: {
              color: "#dc3545",
            },
          },
          {
            label: "Xem chi tiết đơn hàng",
            icon: <Details />,
            handleClick: (row) => handleDetail(row),
            style: {
              color: "#000000",
            },
          },
        ]}
        pagination={{
          page: filter.page,
          pageSize: filter.pageSize,
          totalRecord: totalOrder,
          onPageChange: handlePageChange,
          onPageSizeChange: handlePageSizeChange,
        }}
      />
    </Box>
  );
};
