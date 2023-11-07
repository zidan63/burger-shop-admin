import React from "react";
import { Box, Stack, Typography } from "@mui/material";

export const DataGridEmpty: React.FC = () => {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      Không có dữ liệu
    </Stack>
  );
};
