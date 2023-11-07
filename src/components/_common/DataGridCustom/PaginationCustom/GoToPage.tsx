import styled from "@emotion/styled";
import { ChevronRight } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import SubdirectoryArrowLeftIcon from "@mui/icons-material/SubdirectoryArrowLeft";

interface GoToPageProps {
  page: number;
  totalPage: number;
  onPageChange?: (page: number) => void;
}

const GoToPage: React.FC<GoToPageProps> = ({ page, totalPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const handlePageChange = useCallback(
    (e: any) => {
      e.preventDefault();
      if (onPageChange) onPageChange(parseInt(e.target[0].value));
    },
    [onPageChange]
  );

  return (
    <form onSubmit={handlePageChange}>
      <Box
        sx={{ display: "flex", gap: "10px", justifyContent: "flex-start", alignItems: "center" }}
      >
        <Typography sx={{ fontSize: "14px", fontWeight: "600", color: "rgba(0, 0, 0, 0.87)" }}>
          Đi đến trang:
        </Typography>
        <StyledTextField
          size="small"
          type="number"
          name="page"
          variant="outlined"
          value={currentPage}
          onChange={(e) => setCurrentPage(parseInt(e.target.value))}
          inputProps={{ min: 1, max: totalPage }}
          InputProps={{
            style: { lineHeight: "0", fontSize: "17px" },
            endAdornment: (
              <InputAdornment position="end" sx={{ marginLeft: "0", cursor: "pointer" }}>
                <IconButton type="submit">
                  <SubdirectoryArrowLeftIcon sx={{ fontSize: "25px", color: "black" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </form>
  );
};

export default GoToPage;

const StyledTextField = styled(TextField)({
  width: 100,
  display: "flex",
  alignItems: "center",
  border: "none",
  borderRadius: "4px",
  padding: "6px",
  maxHeight: "35px",
  background: "#f5f5f5",
  "& input[type=number]": {
    padding: "0 0 0 6px",
    MozAppearance: "textfield",
  },
  "& .MuiOutlinedInput-root": {
    padding: 0,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& button": {
    padding: 0,
  },
});
