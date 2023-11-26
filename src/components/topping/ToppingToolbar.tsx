import { Box, Button } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import HeaderCustom from "@components/_common/HeaderCustom/HeaderCustom";
import { ToppingActions } from "@store/topping";
import { useAppDispatch } from "@store";

export const ToppingToolbar = () => {
  const dispatch = useAppDispatch();
  const handleAdd = () => {
    dispatch(
      ToppingActions.setForm({
        open: true,
        topping: null,
      })
    );
  };

  return (
    <HeaderCustom title="Quản lý topping">
      <Box>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleAdd()}
          startIcon={<AddIcon />}
        >
          Thêm topping
        </Button>
      </Box>
    </HeaderCustom>
  );
};
