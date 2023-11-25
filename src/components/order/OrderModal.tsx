import DialogCustom from "@components/_common/DialogCustom/DialogCustom";
import { OrderForm } from "./OrderForm";
import { useAppDispatch, useAppSelector } from "@store";
import { UserActions, UserSelectors } from "@store/user";
import { CategoryActions, CategorySelectors } from "@store/category";
import { OrderActions, OrderSelectors } from "@store/order";

export const OrderModal = () => {
  const { open, order } = useAppSelector(OrderSelectors.getForm());
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(
      OrderActions.setForm({
        open: false,
        order: null,
      })
    );
  };

  return (
    <DialogCustom
      open={open}
      onClose={handleClose}
      title={"Chi tiết đơn hàng"}
      style={{
        dialog: {
          "& .MuiDialog-paperScrollBody": { maxWidth: "1000px" },
        },
        dialogContent: {
          width: { lg: "1000px" },
        },
      }}
    >
      <OrderForm />
    </DialogCustom>
  );
};
