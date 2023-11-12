import DialogCustom from "@components/_common/DialogCustom/DialogCustom";
import { useAppDispatch, useAppSelector } from "@store";
import { SuplierActions, SuplierSelectors } from "@store/suplier";
import { SuplierForm } from "./SuplierForm";

export const SuplierModal = () => {
  const { open, suplier } = useAppSelector(SuplierSelectors.getForm());
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(
      SuplierActions.setForm({
        open: false,
        suplier: null,
      })
    );
  };

  return (
    <DialogCustom
      open={open}
      onClose={handleClose}
      title={!suplier ? "Thêm mới nhà cung cấp" : "Chỉnh sửa thông tin nhà cung cấp"}
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
      <SuplierForm />
    </DialogCustom>
  );
};
