import HeaderCustom from "@components/_common/HeaderCustom/HeaderCustom";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import { useAppDispatch } from "@store";
import { ColorActions } from "@store/color";

export const ColorToolbar = () => {
  const dispatch = useAppDispatch();
  const handleAdd = () => {
    dispatch(
      ColorActions.setForm({
        open: true,
        color: null,
      })
    );
  };

  return (
    <HeaderCustom title="Quản lý màu">
      <Box>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleAdd()}
          startIcon={<AddIcon />}
        >
          Thêm màu
        </Button>
      </Box>
    </HeaderCustom>
  );
};
