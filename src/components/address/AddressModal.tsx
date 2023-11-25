import DialogCustom from "@components/_common/DialogCustom/DialogCustom";
import { AddressForm } from "./AddressForm";
import { useAppDispatch, useAppSelector } from "@store";
import { UserActions, UserSelectors } from "@store/user";
import { AddressActions, AddressSelectors } from "@store/address";

export const AddressModal = () => {
  const { open, address } = useAppSelector(AddressSelectors.getForm());
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(
      AddressActions.setForm({
        open: false,
        address: null,
      })
    );
  };

  return (
    <DialogCustom
      open={open}
      onClose={handleClose}
      title={!address ? "Thêm mới loại sản phẩm" : "Chỉnh sửa thông tin loại sản phẩm"}
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
      <AddressForm />
    </DialogCustom>
  );
};
