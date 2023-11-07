import styled from "@emotion/styled";
import { Box, Card, SxProps, Theme, Typography } from "@mui/material";
import { ColorPallet } from "@config/theme";
import { ReactFCP } from "@types";
import { ReactElement } from "react";

interface Props {
  sx?: SxProps<Theme>;
}
const StyledCardCustom = styled(Card)({
  border: 1,
  borderRadius: "6px",
  borderColor: "#F5F5F5",
  boxShadow: ColorPallet.mainColor.boxShadow,
});

export const CardCustom: ReactFCP = ({ sx, children }) => {
  return <StyledCardCustom sx={{ padding: "16px", ...sx }}>{children}</StyledCardCustom>;
};
