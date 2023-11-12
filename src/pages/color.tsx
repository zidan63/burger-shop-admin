import { useEffect } from "react";
import { Stack } from "@mui/material";
import { DashboardLayout } from "@layouts/dashboard/DashboardLayout";
import { useAppDispatch } from "@store";
import { ColorToolbar } from "@components/color/ColorToolbar";
import { ColorFilter } from "@components/color/ColorFilter";
import { ColorTable } from "@components/color/ColorTable";
import { ColorModal } from "@components/color/ColorModal";
import { ColorThunks } from "@store/color";

const Page = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ColorThunks.search({}));
  }, []);

  return (
    <Stack gap={2}>
      <ColorToolbar />
      <ColorFilter />
      <ColorTable />
      <ColorModal />
    </Stack>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
