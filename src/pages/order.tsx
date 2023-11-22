import React from "react";

import { useEffect } from "react";
import { Box, Stack } from "@mui/material";

import { OrderModal } from "@components/order/OrderModal";
import { OrderTable } from "@components/order/OrderTable";
import { OrderFilter } from "@components/order/OrderFilter";
import { OrderToolbar } from "@components/order/OrderToolbar";
import { DashboardLayout } from "@layouts/dashboard/DashboardLayout";

import { useAppDispatch } from "@store";
import { RoleThunks } from "@store/role";
import { SearchType } from "@types";

const Page = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(RoleThunks.search({}));
    // dispatch(RoleThunks.getAllPermission());
  }, []);

  return (
    <Stack gap={2}>
      <OrderToolbar />
      <OrderFilter />
      <OrderTable />
      <OrderModal />
    </Stack>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
