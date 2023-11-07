import { Button, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import { MenuOptionItemProps } from "./MenuOption";
import { ColorPallet } from "@config/theme";
type Props<T> = MenuOptionItemProps<T> & { value: any };
export function MenuOptionItemLong<T>({ value, icon, label, handleClick, style }: Props<T>) {
  return (
    <Button
      variant="text"
      onClick={(e) => {
        e.stopPropagation();
        if (handleClick) handleClick(value);
      }}
      style={{ width: "100%", justifyContent: "flex-start" }}
      sx={{ flex: 1, ...style }}
      startIcon={icon}
    >
      {label}
    </Button>
  );
}
