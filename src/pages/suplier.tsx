import { useEffect } from "react";
import { Box, Stack } from "@mui/material";

import { RoleModal } from "@components/role/RoleModal";
import { RoleTable } from "@components/role/RoleTable";
import { RoleFilter } from "@components/role/RoleFilter";
import { RoleToolbar } from "@components/role/RoleToolbar";
import { DashboardLayout } from "@layouts/dashboard/DashboardLayout";

import { useAppDispatch } from "@store";
import { SuplierToolbar } from "@components/suplier/SuplierToolbar";
import { SuplierFilter } from "@components/suplier/SuplierFilter";
import { SuplierTable } from "@components/suplier/SuplierTable";
import { SuplierModal } from "@components/suplier/ProductModal";

const Page = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(SuplierThunks.search({ isGetCount: true }));
  }, []);

  return (
    <Stack gap={2}>
      <SuplierToolbar />
      <SuplierFilter />
      <SuplierTable />
      <SuplierModal />
    </Stack>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
