import { Box, Card, Typography } from "@mui/material";
import { ReactElement } from "react";

interface Props {
  title: string;
  children?: ReactElement;
  sx?: any;
}

const CardHeader: React.FC<Props> = ({ title, children, sx }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        ...sx,
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "700", fontSize: "20px" }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
};

export default CardHeader;
