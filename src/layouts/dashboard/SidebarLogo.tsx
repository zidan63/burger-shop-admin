import { LogoSideBar } from "@config/logo";
import { Box } from "@mui/material";
import Link from "next/link";

export const SidebarLogo = () => {
  return (
    <Box sx={{ p: "10px" }}>
      <Link href={"/"}>
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "50px",
            width: "100%",
            borderRadius: "6px",
            transition: "all .15s ease",
          }}
        >
          <img src={LogoSideBar.url} width={LogoSideBar.width} height={LogoSideBar.height} />
        </Box>
      </Link>
    </Box>
  );
};
