import { useEffect } from "react";
import { Box, Stack } from "@mui/material";

import { RoleModal } from "@components/role/RoleModal";
import { RoleTable } from "@components/role/RoleTable";
import { RoleFilter } from "@components/role/RoleFilter";
import { RoleToolbar } from "@components/role/RoleToolbar";
import { DashboardLayout } from "@layouts/dashboard/DashboardLayout";

import { useAppDispatch } from "@store";
import { RoleThunks } from "@store/role";
import { SearchType } from "@types";

const Page = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(RoleThunks.search({}));
    dispatch(RoleThunks.getAllPermission());
  }, []);

  return (
    <Stack gap={2}>
      <RoleToolbar />
      <RoleFilter />
      <RoleTable />
      <RoleModal />
    </Stack>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
