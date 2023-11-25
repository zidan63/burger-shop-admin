import DialogCustom from "@components/_common/DialogCustom/DialogCustom";
import { useAppDispatch, useAppSelector } from "@store";
import { SupplierActions, SupplierSelectors } from "@store/supplier";
import { SupplierForm } from "./SupplierForm";

export const SupplierModal = () => {
  const { open, supplier } = useAppSelector(SupplierSelectors.getForm());
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(
      SupplierActions.setForm({
        open: false,
        supplier: null,
      })
    );
  };

  return (
    <DialogCustom
      open={open}
      onClose={handleClose}
      title={!supplier ? "Thêm mới nhà cung cấp" : "Chỉnh sửa thông tin nhà cung cấp"}
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
      <SupplierForm />
    </DialogCustom>
  );
};
