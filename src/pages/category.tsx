import { useEffect } from "react";
import { Box, Stack } from "@mui/material";

import { RoleModal } from "@components/role/RoleModal";
import { RoleTable } from "@components/role/RoleTable";
import { RoleFilter } from "@components/role/RoleFilter";
import { RoleToolbar } from "@components/role/RoleToolbar";
import { DashboardLayout } from "@layouts/dashboard/DashboardLayout";

import { useAppDispatch } from "@store";
import { SearchType } from "@types";
import { ProductThunks } from "@store/product";
import { CategoryToolbar } from "@components/category/CategoryToolbar";
import { CategoryFilter } from "@components/category/CategoryFilter";
import { CategoryTable } from "@components/category/CategoryTable";
import { CategoryModal } from "@components/category/CategoryModal";

const Page = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(CategoryThunks.search({ isGetCount: true }));
  }, []);

  return (
    <Stack gap={2}>
      <CategoryToolbar />
      <CategoryFilter />
      <CategoryTable />
      <CategoryModal />
    </Stack>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
