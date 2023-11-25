import HeaderCustom from "@components/_common/HeaderCustom/HeaderCustom";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import { useAppDispatch } from "@store";
import { CategoryActions } from "@store/category";

export const StatisticToolbar = () => {
  return <HeaderCustom title="Thống kê" />;
};
