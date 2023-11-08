import HeaderCustom from "@components/_common/HeaderCustom/HeaderCustom";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import { useAppDispatch } from "@store";
import { ProductActions } from "@store/product";

export const ProductToolbar = () => {
  const dispatch = useAppDispatch();
  const handleAdd = () => {
    dispatch(
      ProductActions.setForm({
        open: true,
        product: null,
      })
    );
  };

  return (
    <HeaderCustom title="Quản lý sản phẩm">
      <Box>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleAdd()}
          startIcon={<AddIcon />}
        >
          Thêm sản phẩm
        </Button>
      </Box>
    </HeaderCustom>
  );
};
