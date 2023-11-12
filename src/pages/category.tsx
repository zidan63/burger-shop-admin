import { useEffect } from "react";
import { Stack } from "@mui/material";

import { DashboardLayout } from "@layouts/dashboard/DashboardLayout";

import { useAppDispatch } from "@store";
import { CategoryToolbar } from "@components/category/CategoryToolbar";
import { CategoryFilter } from "@components/category/CategoryFilter";
import { CategoryTable } from "@components/category/CategoryTable";
import { CategoryModal } from "@components/category/CategoryModal";
import { CategoryThunks } from "@store/category";

const Page = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(CategoryThunks.search({}));
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
