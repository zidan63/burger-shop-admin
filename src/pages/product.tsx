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
import { ProductToolbar } from "@components/product/ProductToolbar";
import { ProductFilter } from "@components/product/ProductFilter";
import { ProductTable } from "@components/product/ProductTable";
import { ProductModal } from "@components/product/ProductModal";
import { CategoryThunks } from "@store/category";
import { SuplierThunks } from "@store/suplier";
import { ColorThunks } from "@store/color";

const Page = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ProductThunks.search({}));
    dispatch(ColorThunks.search({ colorFilter: { pageSize: 1000 } }));
    dispatch(SuplierThunks.search({ suplierFilter: { pageSize: 1000 } }));
    dispatch(CategoryThunks.search({ categoryFilter: { pageSize: 1000 } }));
  }, []);

  return (
    <Stack gap={2}>
      <ProductToolbar />
      <ProductFilter />
      <ProductTable />
      <ProductModal />
    </Stack>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
