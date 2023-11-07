import { styled } from "@mui/material/styles";
import { AppBar, Avatar, Box, Toolbar } from "@mui/material";
import React, { useRef, useState } from "react";
import { SidebarResponsive } from "./SidebarResponsive";
import { ColorPallet } from "@config/theme";
import { CardCustom } from "@components/_common/CardCustom";
import { AccountPopover } from "@components/_common/AccountPopover";
import { TitleHeaderDasboard } from "@config/title";

const DashboardNavbarRoot = styled(AppBar)(({ theme }: any) => ({
  background: "#fff",
  position: "relative",
  paddingRight: "0 !important",
}));

const StyledTitle = styled(Box)(({ theme }: any) => ({
  fontSize: "17px",
  fontWeight: "800",
  textAlign: "start",
  color: "#fff",
}));

export const Navbar = () => {
  const settingsRef = useRef(null);
  const [openAccountPopover, setOpenAccountPopover] = useState(false);

  return (
    <DashboardNavbarRoot>
      <CardCustom
        sx={{
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: ColorPallet.mainColor.navbar,
        }}
      >
        <React.Fragment>
          <SidebarResponsive />
          <StyledTitle
            component={"h1"}
            sx={{
              display: { xs: "none", md: "block" },
            }}
          >
            {TitleHeaderDasboard}
          </StyledTitle>
          <Toolbar disableGutters>
            <Avatar
              onClick={() => setOpenAccountPopover(true)}
              ref={settingsRef}
              sx={{ cursor: "pointer", height: 40, width: 40 }}
            />
            <AccountPopover
              anchorEl={settingsRef.current}
              open={openAccountPopover}
              onClose={() => setOpenAccountPopover(false)}
            />
          </Toolbar>
        </React.Fragment>
      </CardCustom>
    </DashboardNavbarRoot>
  );
};
