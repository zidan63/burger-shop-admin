import React from "react";

import { useEffect } from "react";
import { Box, Stack } from "@mui/material";

import { OrderModal } from "@components/order/OrderModal";
import { StatisticTable } from "@components/statistic/StatisticTable";
import { OrderFilter } from "@components/order/OrderFilter";
import { DashboardLayout } from "@layouts/dashboard/DashboardLayout";

import { useAppDispatch } from "@store";
import { OrderThunks } from "@store/order";
import { StatisticToolbar } from "@components/statistic/StatisticToolbar";

const Page = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(OrderThunks.search({}));
  }, []);

  return (
    <Stack gap={2}>
      <StatisticToolbar />
      <StatisticTable />
      {/* <OrderModal /> */}
    </Stack>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
