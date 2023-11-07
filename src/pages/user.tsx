import { useEffect } from "react";
import { Stack } from "@mui/material";
import { DashboardLayout } from "@layouts/dashboard/DashboardLayout";
import { UserToolbar } from "@components/user/UserToolbar";
import { UserTable } from "@components/user/UserTable";
import { UserModal } from "@components/user/UserModal";
import { UserFilter } from "@components/user/UserFilter";
import { useAppDispatch } from "@store";

import { RoleThunks } from "@store/role";
import { UserThunks } from "@store/user";

const Page = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(UserThunks.search({ isGetCount: true }));
    dispatch(RoleThunks.getAll());
  }, []);

  return (
    <Stack gap={2}>
      <UserToolbar />
      <UserFilter />
      <UserTable />
      <UserModal />
    </Stack>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
