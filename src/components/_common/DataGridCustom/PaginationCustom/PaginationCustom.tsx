import styled from "@emotion/styled";
import { Box, Pagination, PaginationItem, Typography } from "@mui/material";
import { ReactNode } from "react";

import GoToPage from "./GoToPage";
import { PaginationPageSize } from "./PaginationPageSize";

export type PaginationCustomProps = {
  page?: number;
  pageSize?: number;
  totalRecord?: number;
  goToPage?: boolean;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
};

export const PaginationCustom: React.FC<PaginationCustomProps> = ({
  page = 1,
  pageSize = 10,
  goToPage = true,
  totalRecord = 0,
  onPageChange,
  onPageSizeChange,
}) => {
  const totalPage = Math.ceil(totalRecord / pageSize) || 1;
  return (
    <StyledContainer>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "24px",
        }}
      >
        {goToPage && <GoToPage page={page} totalPage={totalPage} onPageChange={onPageChange} />}
        {pageSize && (
          <PaginationPageSize pageSize={pageSize} onPaginationPageSizeChange={onPageSizeChange} />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "24px",
        }}
      >
        {!!totalRecord && (
          <Box sx={{ width: { xs: "100%", sm: "max-content" } }}>
            <Box>
              <Typography sx={[{ color: "#5B5656", fontWeight: "600", fontSize: "14px" }]}>
                Tổng số:
                <Typography component={"span"} sx={{ ml: 1, fontWeight: 700, color: "#121212" }}>
                  {totalRecord}
                </Typography>
              </Typography>
            </Box>
          </Box>
        )}

        {totalPage > 1 && (
          <StyledPagination
            page={page}
            siblingCount={1}
            count={totalPage}
            onChange={(_, page) => {
              if (onPageChange) onPageChange(page);
            }}
            renderItem={(item) => <StyledPaginationItem {...item} />}
            sx={{
              width: { xs: "100%" },
            }}
          />
        )}
      </Box>
    </StyledContainer>
  );
};

const StyledContainer = styled(Box)({
  padding: "8px 20px",
  width: "100%",
  maxWidth: "100%",
  minWidth: "100%",
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  borderTop: "1px solid #F5F5F5",
});

const StyledPagination = styled(Pagination)({
  flex: "1",
  "& ul li": {
    width: "40px",
    "& svg": {
      position: "relative",
      top: "0.5px",
    },
  },
});

const StyledPaginationItem = styled(PaginationItem)({
  fontSize: "15px",
  color: "rgb(108, 117, 125)",
  fontWeight: "600",
  width: "37px",
  height: "37px",
  borderRadius: "50%",
  transition: "all .15s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "&.Mui-selected": {
    color: "#121212",
    background: "#f5f5f5",
  },
});
