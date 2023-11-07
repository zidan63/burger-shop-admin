import Head from "next/head";
import { Box } from "@mui/material";
import { DashboardLayout } from "@layouts/dashboard/DashboardLayout";

const Page = () => (
  <>
    <Head>
      <title>Tổng quan</title>
    </Head>
    <Box
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src="/static/images/logo.png"
        style={{
          height: 300,
        }}
      />
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
