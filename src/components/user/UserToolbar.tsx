import HeaderCustom from "@components/_common/HeaderCustom/HeaderCustom";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import { useAppDispatch } from "@store";
import { UserActions } from "@store/user";

export const UserToolbar = () => {
  const dispatch = useAppDispatch();
  const handleAdd = () => {
    dispatch(
      UserActions.setForm({
        open: true,
        user: null,
      })
    );
  };

  return (
    <HeaderCustom title="Quản lý người dùng">
      <Box>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleAdd()}
          startIcon={<AddIcon />}
        >
          Thêm người dùng
        </Button>
      </Box>
    </HeaderCustom>
  );
};
