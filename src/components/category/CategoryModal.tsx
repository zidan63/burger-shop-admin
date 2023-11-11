import DialogCustom from "@components/_common/DialogCustom/DialogCustom";
import { CategoryForm } from "./CategoryForm";
import { useAppDispatch, useAppSelector } from "@store";
import { UserActions, UserSelectors } from "@store/user";
import { CategoryActions, CategorySelectors } from "@store/category";

export const CategoryModal = () => {
  const { open, category } = useAppSelector(CategorySelectors.getForm());
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(
      CategoryActions.setForm({
        open: false,
        category: null,
      })
    );
  };

  return (
    <DialogCustom
      open={open}
      onClose={handleClose}
      title={!category ? "Thêm mới loại sản phẩm" : "Chỉnh sửa thông tin loại sản phẩm"}
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
      <CategoryForm />
    </DialogCustom>
  );
};
