import styled from "@emotion/styled";
import SettingsIcon from "@mui/icons-material/Settings";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import React, { useCallback } from "react";
import { MenuOptionItemProps } from "./MenuOption";
import { ColorPallet } from "@config/theme";

interface MenuOptionItemShortProps<T> {
  value: any;
  options: MenuOptionItemProps<T>[];
}

const StyledSettingButton = styled(Button)({
  padding: "8px",
  color: "#495057",
  background: "#f5f5f5",
  boxShadow: ColorPallet.mainColor.boxShadow,
  borderRadius: "4px",
  transition: "all .15s ease",
  minWidth: "auto",
  ":hover": {
    color: "#121212",
    background: "#f5f5f5",
  },
  "& svg": {
    fontSize: "20px",
  },
});

const StyledMenuItem = styled(MenuItem)({
  gap: "12px",
  minWidth: "100px",
  width: "100%",
  maxWidth: "100%",
  fontSize: "0.9rem",
  fontWeight: "600",
  "& .MuiSvgIcon-root": {
    width: "18px",
    height: "18px",
  },
});

export function MenuOptionItemShort<T>({ value, options }: MenuOptionItemShortProps<T>) {
  const handleClick = useCallback(
    (popupState: any, option: MenuOptionItemProps<T>) => {
      popupState.close();
      if (option.handleClick) option?.handleClick(value);
    },
    [value]
  );

  return (
    <PopupState variant="popover" popupId="popup-menu">
      {(popupState) => {
        const trigger = bindTrigger(popupState);

        return (
          <React.Fragment>
            <StyledSettingButton
              variant="contained"
              onClick={(e) => {
                e.stopPropagation();
                trigger.onClick(e);
              }}
            >
              <SettingsIcon />
            </StyledSettingButton>
            <Menu
              {...bindMenu(popupState)}
              transformOrigin={{ horizontal: "center", vertical: "top" }}
              anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
              sx={{ mt: 1 }}
            >
              {options?.map((option, index) => (
                <StyledMenuItem
                  key={index}
                  style={{ ...option?.style }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleClick(popupState, option);
                  }}
                >
                  {option.icon}
                  {option.label}
                </StyledMenuItem>
              ))}
            </Menu>
          </React.Fragment>
        );
      }}
    </PopupState>
  );
}
