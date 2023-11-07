import { Button, Typography } from "@mui/material";
import { ColorPallet } from "@config/theme";
import { ReactNode } from "react";

interface Props {
  title?: string;
  type?: "button" | "submit" | "reset";
  variant?: "text" | "outlined" | "contained";
  onClick?: any;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  sx?: any;
  disabled?: boolean;
}

export const ButtonCustom: React.FC<Props> = ({
  type,
  onClick,
  startIcon,
  endIcon,
  title,
  sx,
  disabled,
  variant,
}) => {
  return (
    <Button
      component={"button"}
      type={type || "button"}
      variant={variant || "contained"}
      color="primary"
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
      sx={{
        // "& .MuiButton-startIcon": {
        //   marginLeft: { xs: "0", sm: "-4px" },
        //   marginRight: { xs: "0", sm: "8px" },
        // },
        minWidth: "max-content",
        height: "max-content",
        borderRadius: "6px",
        border: variant !== "text" ? "1px solid" : "unset",
        borderColor: ColorPallet.mainColor.button,
        ...sx,
      }}
    >
      <Typography
        component="span"
        sx={{
          // display: { xs: "none", sm: "inline" },
          fontWeight: "600",
          fontSize: "14px",
        }}
      >
        {title}
      </Typography>
    </Button>
  );
};
