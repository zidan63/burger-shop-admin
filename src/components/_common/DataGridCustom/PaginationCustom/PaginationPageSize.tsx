import styled from "@emotion/styled";
import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import React from "react";

type PaginationPageSizeProps = {
  pageSize: number;
  onPaginationPageSizeChange: any;
};

export const PaginationPageSize: React.FC<PaginationPageSizeProps> = ({
  pageSize,
  onPaginationPageSizeChange,
}) => {
  return (
    <Box sx={{ display: "flex", gap: "10px", justifyContent: "flex-start", alignItems: "center" }}>
      <Typography sx={{ fontSize: "14px", fontWeight: "600", color: "rgba(0, 0, 0, 0.87)" }}>
        Hiển thị:
      </Typography>
      <FormControl sx={{ width: 100 }}>
        <StyledSelect
          size="small"
          value={pageSize}
          onChange={(e) => onPaginationPageSizeChange(e.target.value)}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </StyledSelect>
      </FormControl>
    </Box>
  );
};

const StyledSelect = styled(Select)({
  border: "none",
  outline: "none",
  borderRadius: "4px",
  background: "#f5f5f5",

  "& .MuiSelect-select": {
    borderRadius: "4px",
    padding: "6px",
  },
  "& .MuiSvgIcon-root": {
    color: "black",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
    outline: "none",
  },
  "&.Mui-focused": {
    border: "none",
    outline: "none",
  },
  "& svg": {
    transition: "all .1s ease",
  },
});
