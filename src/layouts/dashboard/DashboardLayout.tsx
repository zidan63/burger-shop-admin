import { useState } from "react";
import { Box } from "@mui/material";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

export const DashboardLayout = (props: any) => {
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar setOpenSidebar={(isOpen: boolean) => setSidebarOpen(isOpen)} open={isSidebarOpen} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: "1 1 auto",
          maxWidth: "100%",
          transition: "all .15s ease",
          padding: "10px",
          paddingLeft: { xs: "10px", md: isSidebarOpen ? "310px" : "110px" },
        }}
      >
        <Navbar />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: "1 1 auto",
            width: "100%",
            minHeight: "100%",
            maxWidth: "100%",
            py: 2,
          }}
          onClick={() => {
            setSidebarOpen(false);
          }}
        >
          {children}
        </Box>

        <Footer />
      </Box>
    </>
  );
};
