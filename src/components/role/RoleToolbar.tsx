import HeaderCustom from "@components/_common/HeaderCustom/HeaderCustom";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import { useAppDispatch } from "@store";
import { RoleActions } from "@store/role";

export const RoleToolbar = () => {
  const dispatch = useAppDispatch();
  const handleAdd = () => {
    dispatch(
      RoleActions.setForm({
        open: true,
        role: null,
      })
    );
  };

  return (
    <HeaderCustom title="Quản lý vai trò">
      <Box>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleAdd()}
          startIcon={<AddIcon />}
        >
          Thêm vai trò
        </Button>
      </Box>
    </HeaderCustom>
  );
};
