import { DashboardLayout } from "@layouts/dashboard/DashboardLayout";
import { Stack } from "@mui/material";
import { ToppingFilter } from "@components/topping/ToppingFilter";
import { ToppingModal } from "@components/topping/ToppingModal";
import { ToppingTable } from "@components/topping/ToppingTable";
import { ToppingThunks } from "@store/topping";
import { ToppingToolbar } from "@components/topping/ToppingToolbar";
import { useAppDispatch } from "@store";
import { useEffect } from "react";

const Page = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ToppingThunks.search({}));
  }, []);

  return (
    <Stack gap={2}>
      <ToppingToolbar />
      <ToppingFilter />
      <ToppingTable />
      <ToppingModal />
    </Stack>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
