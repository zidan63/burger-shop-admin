import React from "react";
import { MenuOptionItemShort } from "./MenuOptionItemShort";
import { MenuOptionItemLong } from "./MenuOptionItemLong";
import { Box } from "@mui/material";

export interface MenuOptionItemProps<T> {
  icon?: any;
  label: string;
  handleClick?: (item: T) => void;
  style?: any;
}

interface MenuOptionProps<T> {
  value: T;
  options: MenuOptionItemProps<T>[];
  isLongOption?: boolean;
}

export function MenuOption<T>({ value, isLongOption, options }: MenuOptionProps<T>) {
  if (isLongOption)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        {options.map((option, index) => (
          <MenuOptionItemLong {...option} key={index} value={value} />
        ))}
      </Box>
    );

  return (
    <React.Fragment>
      <MenuOptionItemShort value={value} options={options} />
    </React.Fragment>
  );
}
