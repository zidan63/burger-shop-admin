import { Box, Divider, Grid } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "@store";

import { TextFieldCustom } from "@components/_common/TextFieldCustom";
import React from "react";
import * as Yup from "yup";
import { ButtonCustom } from "@components/_common/ButtonCustom";

import { NotificationUtil } from "@utils/NotificationUtil";

import { SuplierSelectors, SuplierThunks } from "@store/supplier";

const validationSchema = Yup.object().shape({
  code: Yup.string()
    .required("Mã nhà cung cấp bắt buộc nhập!")
    .min(3, "Mã nhà cung cấp tối thiểu 6 kí tự!")
    .max(15, "Mã nhà cung cấp tối đa 15 kí tự!"),
  name: Yup.string()
    .required("Tên nhà cung cấp bắt buộc nhập!")
    .min(6, "Tên nhà cung cấp tối thiểu 6 kí tự!")
    .max(100, "Tên nhà cung cấp tối đa 100 kí tự!"),
  phone: Yup.string()
    .required("Số điện thoại bắt buộc nhập!")
    .min(6, "Số điện thoại tối thiểu 6 kí tự!")
    .max(15, "Số điện thoại tối đa 15 kí tự!"),
  address: Yup.string()
    .required("Địa chỉ bắt buộc nhập!")
    .min(6, "Địa chỉ tối thiểu 6 kí tự!")
    .max(30, "Địa chỉ tối đa 30 kí tự!"),
});

export const SuplierForm: React.FC = () => {
  const { suplier } = useAppSelector(SuplierSelectors.getForm());

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: suplier
      ? suplier
      : {
          code: "",
          name: "",
          address: "",
          phone: "",
        },
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      if (suplier !== null) return handleUpdateSuplier(values);
      else handleCreateSuplier(values);
    },
  });

  const handleCreateSuplier = async (values) => {
    const result = await dispatch(SuplierThunks.create(values));
    if (SuplierThunks.create.rejected.match(result)) return formik.setSubmitting(false);

    NotificationUtil.success("Đã thêm nhà cung cấp thành công");
    formik.resetForm();
  };

  const handleUpdateSuplier = async (values) => {
    if (!suplier) return;
    const result = await dispatch(SuplierThunks.update(values));
    if (SuplierThunks.update.rejected.match(result)) return formik.setSubmitting(false);
    NotificationUtil.success("Đã chỉnh sửa nhà cung cấp thành công");
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
            label="Mã nhà cung cấp"
            name="code"
            placeholder="Ví dụ: NCC001"
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
            label="Tên nhà cung cấp"
            name="name"
            placeholder="Ví dụ: Công ty A"
            onTextChange={formik.setFieldValue}
            required
            value={formik.values.name}
            variant="outlined"
            error={!!formik.errors.name}
            helperText={formik.errors.name}
          />
        </Grid>

        <Grid item md={12} xs={12}>
          <TextFieldCustom
            fullWidth
            label="Địa chỉ nhà cung cấp"
            name="address"
            placeholder="Ví dụ: 32/6 đường số 1 phường BHHA Quận Bình Tân"
            required
            onTextChange={formik.setFieldValue}
            value={formik.values.address}
            variant="outlined"
            error={!!formik.errors.address}
            helperText={formik.errors.address}
          />
        </Grid>

        <Grid item md={12} xs={12}>
          <TextFieldCustom
            fullWidth
            label="Số điện thoại nhà cung cấp"
            name="phone"
            placeholder="Ví dụ: 0385467216"
            required
            onTextChange={formik.setFieldValue}
            value={formik.values.phone}
            variant="outlined"
            error={!!formik.errors.phone}
            helperText={formik.errors.phone}
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
          title={formik.isSubmitting ? "Đang xử lý..." : !suplier ? "Thêm mới" : "Lưu"}
        />
      </Box>
    </Box>
  );
};
