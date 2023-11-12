import { Box, Divider, Drawer, SxProps, Theme } from "@mui/material";
import { SubNav } from "./SubNav";
import { authService } from "@services/auth/AuthService";
import CollapseLeft from "@mui/icons-material/KeyboardDoubleArrowLeft";
import CollapseRight from "@mui/icons-material/KeyboardDoubleArrowRightSharp";
import LogoutIcon from "@mui/icons-material/Logout";
import { SidebarBackground } from "./SidebarBackground";
import { SidebarLogo } from "./SidebarLogo";
import { ColorPallet } from "@config/theme";
import { SideBarRouteAdmin, SideBarRouteSaler } from "@config/sidebar";
import React from "react";
import { AuthSelectors } from "@store/auth";
import { useAppSelector } from "@store";

type Props = {
  setOpenSidebar: (value: boolean) => void;
  open: boolean;
};

export const Sidebar: React.FC<Props> = ({ open, setOpenSidebar }) => {
  const { userCurrent } = useAppSelector(AuthSelectors.getUserCurrent());

  const handleSignOut = async () => {
    await authService.logout();
  };

  const slideBars = userCurrent?.role?.code === "ADMIN" ? SideBarRouteAdmin : SideBarRouteSaler;

  return (
    <Drawer
      PaperProps={{
        sx: {
          display: { xs: "none", md: "block" },
          overflow: "hidden",
          width: open ? "280px" : "78px",
          transition: "all .15s ease",
          left: "10px",
          top: "10px",
          bottom: "10px",
          height: "auto",
          borderRadius: "6px",
          boxShadow: ColorPallet.mainColor.boxShadow,
        },
      }}
      sx={{ zIndex: 1001 }}
      variant="permanent"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          position: "relative",
        }}
      >
        <SidebarBackground />
        <SidebarLogo />
        <Divider sx={{ borderColor: "rgba(255,255,255,.3)" }} />

        <Box
          sx={{
            ...styles.group,
            flexGrow: 1,
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "0",
            },
          }}
        >
          {slideBars.map((item, index) => (
            <SubNav key={index} item={item} open={open} setOpenSidebar={setOpenSidebar} />
          ))}
        </Box>

        <Box sx={{ ...styles.group, justifyContent: "flex-end" }}>
          <SubNav
            item={{
              icon: <CollapseRight fontSize="small" />,
              expandIcon: <CollapseLeft fontSize="small" />,
              title: "Thu gọn",
            }}
            open={open}
            onClick={() => setOpenSidebar(!open)}
          />
        </Box>
      </Box>
    </Drawer>
  );
};

const styles: Record<string, SxProps<Theme>> = {
  group: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: "8px",
    padding: "12px",
  },
};
