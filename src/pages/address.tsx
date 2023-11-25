import { useEffect } from "react";
import { Stack } from "@mui/material";

import { DashboardLayout } from "@layouts/dashboard/DashboardLayout";

import { useAppDispatch } from "@store";
import { AddressToolbar } from "@components/address/AddressToolbar";
import { AddressFilter } from "@components/address/AddressFilter";
import { AddressTable } from "@components/address/AddressTable";
import { AddressModal } from "@components/address/AddressModal";
import { AddressThunks } from "@store/address";

const Page = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(AddressThunks.search({}));
  }, []);

  return (
    <Stack gap={2}>
      <AddressToolbar />
      <AddressFilter />
      <AddressTable />
      <AddressModal />
    </Stack>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
