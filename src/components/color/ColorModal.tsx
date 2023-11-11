import DialogCustom from "@components/_common/DialogCustom/DialogCustom";
import { useAppDispatch, useAppSelector } from "@store";
import { ColorActions, ColorSelectors } from "@store/color";
import { ColorForm } from "./ColorForm";

export const ColorModal = () => {
  const { open, color } = useAppSelector(ColorSelectors.getForm());
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(
      ColorActions.setForm({
        open: false,
        color: null,
      })
    );
  };

  return (
    <DialogCustom
      open={open}
      onClose={handleClose}
      title={!color ? "Thêm mới loại sản phẩm" : "Chỉnh sửa thông tin loại sản phẩm"}
      subTitle={"Nhập thông tin vào các ô tương ứng"}
      style={{
        dialog: {
          "& .MuiDialog-paperScrollBody": { maxWidth: "600px" },
        },
        dialogContent: {
          width: { lg: "600px" },
        },
      }}
    >
      <ColorForm />
    </DialogCustom>
  );
};
