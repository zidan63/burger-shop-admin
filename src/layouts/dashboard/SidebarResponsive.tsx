import { Box, Button, Divider, Drawer, SxProps, Theme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { SubNav } from "./SubNav";
import { SidebarBackground } from "./SidebarBackground";
import { SidebarLogo } from "./SidebarLogo";
import CollapseLeft from "@mui/icons-material/KeyboardDoubleArrowLeft";
import CollapseRight from "@mui/icons-material/KeyboardDoubleArrowRightSharp";
import LogoutIcon from "@mui/icons-material/Logout";
import { authService } from "@services/auth/AuthService";
import { SideBarRoute } from "@config/sidebar";

export const SidebarResponsive = () => {
  const [open, setOpen] = useState(false);
  const handleSignOut = async () => {
    await authService.logout();
  };

  return (
    <Box sx={{ display: { md: "none" } }}>
      <Box sx={{ position: "relative" }}>
        <Button
          sx={{
            borderRadius: "6px",
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            height: "50px",
            minWidth: "50px",
            width: "100%",
            overflow: "hidden",
            transition: "all .15s ease",
            "& svg": {
              marginLeft: "1.25px",
            },
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
            },
            fontWeight: "500",
            color: "#FFFFFF",
          }}
          onClick={() => setOpen(true)}
        >
          <MenuIcon sx={{ color: "#fff", padding: 0 }} />
        </Button>
      </Box>
      <Drawer
        anchor={"left"}
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "100%", sm: "80%" },
            minWidth: { xs: "100%", sm: "80%" },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            position: "relative",
            padding: "10px 24px",
          }}
        >
          <SidebarBackground />
          <SidebarLogo />
          <Divider sx={{ borderColor: "rgba(255,255,255,.3)", py: "5px" }} />

          <Box
            sx={{
              ...styles.group,
              flexGrow: 1,
              pt: "10px",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "0",
              },
            }}
          >
            {SideBarRoute.map((item, index) => (
              <SubNav key={index} item={item} open={true} onClick={() => setOpen(false)} />
            ))}
          </Box>

          <Box sx={{ ...styles.group, justifyContent: "flex-end" }}>
            <SubNav
              item={{
                icon: <CollapseRight fontSize="small" />,
                expandIcon: <CollapseLeft fontSize="small" />,
                title: "Thu gọn",
              }}
              open={true}
              onClick={() => setOpen(false)}
            />
            <SubNav
              item={{
                icon: <LogoutIcon fontSize="small" />,
                expandIcon: <LogoutIcon fontSize="small" />,
                title: "Đăng xuất",
              }}
              open={true}
              onClick={() => handleSignOut()}
            />
          </Box>
        </Box>
      </Drawer>
    </Box>
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
