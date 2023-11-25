import { Box, Divider, Grid } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "@store";

import { TextFieldCustom } from "@components/_common/TextFieldCustom";
import React from "react";
import * as Yup from "yup";
import { ButtonCustom } from "@components/_common/ButtonCustom";

import { NotificationUtil } from "@utils/NotificationUtil";
import { AddressSelectors, AddressThunks } from "@store/address";

const validationAddress = Yup.object().shape({
  code: Yup.string()
    .required("Mã loại sản phẩm bắt buộc nhập!")
    .min(3, "Mã loại sản phẩm tối thiểu 3 kí tự!")
    .max(15, "Mã loại sản phẩm tối đa 15 kí tự!"),
  name: Yup.string()
    .required("Tên loại sản phẩm bắt buộc nhập!")
    .min(6, "Tên loại sản phẩm tối thiểu 6 kí tự!")
    .max(100, "Tên loại sản phẩm tối đa 100 kí tự!"),
});

export const AddressForm: React.FC = () => {
  const { address } = useAppSelector(AddressSelectors.getForm());

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: address
      ? address
      : {
          code: "",
          name: "",
        },
    validationSchema: validationAddress,
    validateOnChange: false,
    onSubmit: (values) => {
      if (address !== null) return handleUpdateAddress(values);
      else handleCreateAddress(values);
    },
  });

  const handleCreateAddress = async (values) => {
    const result = await dispatch(AddressThunks.create(values));
    if (AddressThunks.create.rejected.match(result)) return formik.setSubmitting(false);

    NotificationUtil.success("Đã thêm loại sản phẩm thành công");
    formik.resetForm();
  };

  const handleUpdateAddress = async (values) => {
    if (!address) return;
    const result = await dispatch(AddressThunks.update(values));
    if (AddressThunks.update.rejected.match(result)) return formik.setSubmitting(false);
    NotificationUtil.success("Đã chỉnh sửa loại sản phẩm thành công");
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      noValidate={true}
      onSubmit={formik.handleSubmit}
      sx={{ maxHeight: "70vh" }}
    >
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <TextFieldCustom
            fullWidth
            label="Mã loại sản phẩm"
            name="code"
            placeholder="Ví dụ: BURGER"
            onTextChange={formik.setFieldValue}
            required
            value={formik.values.code}
            variant="outlined"
            error={!!formik.errors.code}
            helperText={formik.errors.code}
          />
        </Grid>

        <Grid item md={12} xs={12}>
          <TextFieldCustom
            fullWidth
            label="Tên loại sản phẩm"
            name="name"
            placeholder="Ví dụ: Bánh Burger"
            onTextChange={formik.setFieldValue}
            required
            value={formik.values.name}
            variant="outlined"
            error={!!formik.errors.name}
            helperText={formik.errors.name}
          />
        </Grid>
      </Grid>
      <Divider sx={{ mt: 3 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          pt: 2,
        }}
      >
        <ButtonCustom
          disabled={!formik.dirty || formik.isSubmitting}
          type="submit"
          title={formik.isSubmitting ? "Đang xử lý..." : !address ? "Thêm mới" : "Lưu"}
        />
      </Box>
    </Box>
  );
};
