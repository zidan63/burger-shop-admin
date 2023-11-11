import { useState } from "react";
import { Autocomplete, Box, Checkbox, Divider, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { UserSelectors, UserThunks } from "@store/user";
import { useAppDispatch, useAppSelector } from "@store";
import { RoleSelectors } from "@store/role";

import { TextFieldCustom } from "@components/_common/TextFieldCustom";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import React, { useMemo } from "react";
import * as Yup from "yup";
import { ButtonCustom } from "@components/_common/ButtonCustom";

import { NotificationUtil } from "@utils/NotificationUtil";
import { FormUtil } from "@utils/FormUtil";
import { ColorSelectors, ColorThunks } from "@store/color";
import { SuplierSelectors } from "@store/suplier";
import { Suplier } from "@services/suplier";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const validationUpdateColor = Yup.object().shape({
  code: Yup.string()
    .required("Mã màu bắt buộc nhập!")
    .min(6, "Mã màu tối thiểu 6 kí tự!")
    .max(15, "Mã màu tối đa 15 kí tự!"),
  fullName: Yup.string()
    .required("Họ và tên bắt buộc nhập!")
    .min(6, "Họ và tên tối thiểu 6 kí tự!")
    .max(100, "Họ và tên tối đa 100 kí tự!"),
  phone: Yup.string()
    .required("Số điện thoại bắt buộc nhập!")
    .min(6, "Số điện thoại tối thiểu 6 kí tự!")
    .max(15, "Số điện thoại tối đa 15 kí tự!"),
  email: Yup.string().matches(
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Email chưa đúng định dạng! Phải có @, sau @ có tối thiểu 3 kí tự tiếp theo là có dấu chấm. Ví dụ: hoten@abc.com"
  ),
  username: Yup.string()
    .required("Tài khoản bắt buộc nhập!")
    .min(6, "Tài khoản tối thiểu 6 kí tự!")
    .max(30, "Tài khoản tối đa 30 kí tự!")
    .matches(/^\S*$/, "Tài khoản không được chứa khoảng trắng!"),
  workUnitId: Yup.string().required("Làm việc tại tổ chức bắt buộc nhập!"),
  roleIds: Yup.array().min(1, "Vai trò bắt buộc nhập!"),
});

const validationCreateColor = Yup.object().shape({
  password: Yup.string()
    .required("Mật khẩu bắt buộc nhập")
    .min(6, "Mật khẩu tối thiểu 6 kí tự!")
    .max(30, "Mật khẩu tối đa 30 kí tự!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,30}$/,
      "Mật khẩu phải chứa ít nhất một ký tự số, một ký tự hoa, một ký tự thường và một ký tự đặc biệt, không có khoảng trắng!"
    ),
  passwordRetype: Yup.string()
    .required("Nhập lại mật khẩu bắt buộc nhập!")
    .oneOf([Yup.ref("password")], "Mật khẩu không khớp!"),
});

export const ColorForm: React.FC = () => {
  const { color } = useAppSelector(ColorSelectors.getForm());

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: color
      ? color
      : {
          id: "",
          name: "",
        },
    validationSchema: color
      ? validationUpdateColor
      : validationUpdateColor.concat(validationCreateColor),
    validateOnChange: false,
    onSubmit: (values) => {
      if (color !== null) return handleUpdateColor(values);
      else handleCreateColor(values);
    },
  });

  const handleCreateColor = async (values) => {
    const result = await dispatch(ColorThunks.create(values));
    if (ColorThunks.create.rejected.match(result)) return formik.setSubmitting(false);

    NotificationUtil.success("Đã thêm màu thành công");
    formik.resetForm();
  };

  const handleUpdateColor = async (values) => {
    if (!color) return;
    const editedFields = FormUtil.getDirtyValues(values, formik.initialValues);
    const result = await dispatch(ColorThunks.update({ id: color.id, color: editedFields }));
    if (ColorThunks.update.rejected.match(result)) return formik.setSubmitting(false);
    NotificationUtil.success("Đã chỉnh sửa màu thành công");
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
            label="Mã màu"
            name="code"
            placeholder="Ví dụ: #CCC"
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
            label="Tên màu"
            name="name"
            placeholder="Ví dụ: Màu hường"
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
          py: 2,
        }}
      >
        <ButtonCustom
          disabled={!formik.dirty || formik.isSubmitting}
          type="submit"
          title={formik.isSubmitting ? "Đang xử lý..." : !color ? "Thêm mới" : "Lưu"}
        />
      </Box>
    </Box>
  );
};
