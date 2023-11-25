import { Box, Divider, Grid } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "@store";

import { TextFieldCustom } from "@components/_common/TextFieldCustom";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { ButtonCustom } from "@components/_common/ButtonCustom";

import { NotificationUtil } from "@utils/NotificationUtil";
import { CategorySelectors, CategoryThunks } from "@store/category";
import { DataGridCustom } from "@components/_common/DataGridCustom";
import { OrderSelectors } from "@store/order";
import { formatCurrency } from "@utils/StringFormat";
export const OrderForm: React.FC = () => {
  const { order } = useAppSelector(OrderSelectors.getForm());
  useEffect(() => {
    console.log(order);
  }, [order]);
  return (
    <Box component="form" autoComplete="off" noValidate={true} sx={{ maxHeight: "70vh" }}>
      <DataGridCustom
        rowsData={order?.billDetails || []}
        columnsData={[
          {
            field: "id",
            headerName: "Mã hoá đơn",
            type: "text",
          },
          {
            field: "name",
            headerName: "Tên sản phẩm",
            valueGetter: (param) => param.row.product.name,
            type: "text",
          },
          {
            field: "amount",
            headerName: "Số lượng",
            // valueGetter: (param) => param.row.product.name,
            type: "text",
          },
          {
            field: "priceSaleBill",
            headerName: "Giá sản phẩm",
            valueGetter: (param) => formatCurrency("USD", param.row.priceSaleBill),
            type: "text",
          },
          {
            field: "total",
            headerName: "Tổng giá",
            valueGetter: (param) =>
              formatCurrency("USD", param.row.priceSaleBill * param.row.amount),
            type: "text",
          },
        ]}
      />
    </Box>
  );
};
