import { useEffect } from "react";
import { Box, Stack } from "@mui/material";

import { RoleModal } from "@components/role/RoleModal";
import { RoleTable } from "@components/role/RoleTable";
import { RoleFilter } from "@components/role/RoleFilter";
import { RoleToolbar } from "@components/role/RoleToolbar";
import { DashboardLayout } from "@layouts/dashboard/DashboardLayout";

import { useAppDispatch } from "@store";
import { SupplierToolbar } from "@components/supplier/SupplierToolbar";
import { SupplierFilter } from "@components/supplier/SupplierFilter";
import { SupplierTable } from "@components/supplier/SupplierTable";
import { SupplierModal } from "@components/supplier/SupplierModal";
import { SupplierThunks } from "@store/supplier";

const Page = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(SupplierThunks.search({}));
  }, []);

  return (
    <Stack gap={2}>
      <SupplierToolbar />
      <SupplierFilter />
      <SupplierTable />
      <SupplierModal />
    </Stack>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
