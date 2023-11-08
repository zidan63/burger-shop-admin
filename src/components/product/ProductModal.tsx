import DialogCustom from "@components/_common/DialogCustom/DialogCustom";
import { ProductForm } from "./ProductForm";
import { useAppDispatch, useAppSelector } from "@store";
import { UserActions, UserSelectors } from "@store/user";
import { ProductActions, ProductSelectors } from "@store/product";

export const ProductModal = () => {
  const { open, product } = useAppSelector(ProductSelectors.getForm());
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(
      ProductActions.setForm({
        open: false,
        product: null,
      })
    );
  };

  return (
    <DialogCustom
      open={open}
      onClose={handleClose}
      title={!product ? "Thêm mới sản phẩm" : "Chỉnh sửa thông tin sản phẩm"}
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
      <ProductForm />
    </DialogCustom>
  );
};
