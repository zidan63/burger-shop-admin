import { ToppingActions, ToppingSelectors } from "@store/topping";
import { useAppDispatch, useAppSelector } from "@store";

import DialogCustom from "@components/_common/DialogCustom/DialogCustom";
import { ToppingForm } from "./ToppingForm";

export const ToppingModal = () => {
  const { open, topping } = useAppSelector(ToppingSelectors.getForm());
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(
      ToppingActions.setForm({
        open: false,
        topping: null,
      })
    );
  };

  return (
    <DialogCustom
      open={open}
      onClose={handleClose}
      title={!topping ? "Thêm mới topping" : "Chỉnh sửa thông tin topping"}
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
      <ToppingForm />
    </DialogCustom>
  );
};
