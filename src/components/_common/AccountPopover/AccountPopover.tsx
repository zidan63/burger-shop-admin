import { useContext, useEffect } from "react";
import { Box, MenuItem, MenuList, Popover, Typography } from "@mui/material";

import { useRouter } from "next/router";
import { authService } from "@services/auth/AuthService";
import { useAppDispatch, useAppSelector } from "@store";
import { AuthSelectors, AuthThunks } from "@store/auth";
import { redirect } from "next/dist/server/api-utils";

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const { userCurrent } = useAppSelector(AuthSelectors.getUserCurrent());
  const route = useRouter();
  const dispatch = useAppDispatch();

  const handleSignOut = async () => {
    await authService.logout();
    route.push("/login");
  };

  useEffect(() => {
    dispatch(AuthThunks.getUserCurrent());
  }, []);

  if (!userCurrent) return <></>;

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      PaperProps={{ sx: { width: "max-content", mt: 1 } }}
      onClose={onClose}
      open={open}
      {...other}
    >
      <Box sx={{ py: 1.5, px: 2 }}>
        <Typography
          variant="overline"
          sx={{
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          Tài khoản
        </Typography>

        <Box sx={{ mb: 0.5 }}>
          <Typography
            component="span"
            sx={{ fontWeight: "500", fontSize: "14px", color: "#343a40" }}
          >
            Họ và tên:
          </Typography>
          <Typography component="span" sx={{ fontWeight: "500", fontSize: "14px", ml: 1 }}>
            {userCurrent?.fullName}
          </Typography>
        </Box>
        <Box sx={{ mb: 0.5 }}>
          <Typography
            component="span"
            sx={{ fontWeight: "500", fontSize: "14px", color: "#343a40" }}
          >
            Vai trò:
          </Typography>
          <Typography component="span" sx={{ fontWeight: "500", fontSize: "14px", ml: 1 }}>
            {userCurrent.role.name}
          </Typography>
        </Box>
      </Box>
      <MenuList
        disablePadding
        sx={{
          "& > *": {
            "&:first-of-type": {
              borderTopColor: "divider",
              borderTopStyle: "solid",
              borderTopWidth: "1px",
            },
            padding: "12px 16px",
          },
        }}
      >
        <MenuItem onClick={handleSignOut}>
          <Typography textAlign="center">Đăng xuất</Typography>
        </MenuItem>
      </MenuList>
    </Popover>
  );
};
