import DialogCustom from "@components/_common/DialogCustom/DialogCustom";
import { UserForm } from "./UserForm";
import { useAppDispatch, useAppSelector } from "@store";
import { UserActions, UserSelectors } from "@store/user";

export const UserModal = () => {
  const { open, user } = useAppSelector(UserSelectors.getForm());
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(
      UserActions.setForm({
        open: false,
        user: null,
      })
    );
  };

  return (
    <DialogCustom
      open={open}
      onClose={handleClose}
      title={!user ? "Thêm mới người dùng" : "Chỉnh sửa thông tin người dùng"}
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
      <UserForm />
    </DialogCustom>
  );
};
