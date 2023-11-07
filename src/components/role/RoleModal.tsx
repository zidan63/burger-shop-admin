import { RoleForm } from "./RoleForm";
import DialogCustom from "@components/_common/DialogCustom/DialogCustom";

import { useAppDispatch, useAppSelector } from "@store";
import { RoleActions, RoleSelectors } from "@store/role";

export const RoleModal = () => {
  const { open, role } = useAppSelector(RoleSelectors.getForm());
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(
      RoleActions.setForm({
        open: false,
        role: null,
      })
    );
  };

  return (
    <DialogCustom
      open={open}
      onClose={handleClose}
      title={!role ? "Thêm mới vai trò" : "Chỉnh sửa thông tin vai trò"}
      subTitle={"Nhập thông tin vào các ô tương ứng"}
      style={{
        dialog: {
          "& .MuiDialog-paperScrollBody": { maxWidth: "800px" },
        },
        dialogContent: {
          width: { lg: "800px" },
        },
      }}
    >
      <RoleForm />
    </DialogCustom>
  );
};
