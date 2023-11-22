import HeaderCustom from "@components/_common/HeaderCustom/HeaderCustom";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import { useAppDispatch } from "@store";
import { SupplierActions } from "@store/supplier";

export const SuplierToolbar = () => {
  const dispatch = useAppDispatch();
  const handleAdd = () => {
    dispatch(
      SupplierActions.setForm({
        open: true,
        supplier: null,
      })
    );
  };

  return (
    <HeaderCustom title="Quản lý nhà cung cấp">
      <Box>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleAdd()}
          startIcon={<AddIcon />}
        >
          Thêm nhà cung cấp
        </Button>
      </Box>
    </HeaderCustom>
  );
};
