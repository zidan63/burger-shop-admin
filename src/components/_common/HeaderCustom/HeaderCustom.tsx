import { Box, SxProps, Theme, Typography } from "@mui/material";
import React, { ReactElement } from "react";
import styled from "@emotion/styled";
import Head from "next/head";
import { ColorPallet } from "@config/theme";

interface Props {
  title: string;
  children?: ReactElement;
  sx?: SxProps<Theme>;
}

const HeaderCustom: React.FC<Props> = ({ title, children, sx }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "24px",
          ...sx,
        }}
      >
        <StyledHeading variant={"h1"}>{title}</StyledHeading>
        {children}
      </Box>
    </>
  );
};

export default HeaderCustom;

const StyledHeading = styled(Typography)({
  fontSize: "22px",
  fontWeight: "700",
  marginBottom: "10px",
  color: "#212529",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    left: "0",
    bottom: "-8px",
    height: "4px",
    background: ColorPallet.mainColor.tableHead,
    borderRadius: "50px",
    width: "60px",
  },
});
