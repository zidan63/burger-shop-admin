import { CategoryThunks } from "@store/category";
import { DashboardLayout } from "@layouts/dashboard/DashboardLayout";
import { ProductFilter } from "@components/product/ProductFilter";
import { ProductModal } from "@components/product/ProductModal";
import { ProductTable } from "@components/product/ProductTable";
import { ProductThunks } from "@store/product";
import { ProductToolbar } from "@components/product/ProductToolbar";
import { Stack } from "@mui/material";
import { SupplierThunks } from "@store/supplier";
import { ToppingThunks } from "@store/topping";
import { useAppDispatch } from "@store";
import { useEffect } from "react";

const Page = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ProductThunks.search({}));
    dispatch(ToppingThunks.search({ toppingFilter: { pageSize: 1000 } }));
    dispatch(SupplierThunks.search({ supplierFilter: { pageSize: 1000 } }));
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
