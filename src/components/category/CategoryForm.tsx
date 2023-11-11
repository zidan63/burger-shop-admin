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
import { CategorySelectors, CategoryThunks } from "@store/category";
import { SuplierSelectors } from "@store/suplier";
import { Suplier } from "@services/suplier";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const validationUpdateCategory = Yup.object().shape({
  code: Yup.string()
    .required("Mã loại sản phẩm bắt buộc nhập!")
    .min(6, "Mã loại sản phẩm tối thiểu 6 kí tự!")
    .max(15, "Mã loại sản phẩm tối đa 15 kí tự!"),
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

const validationCreateCategory = Yup.object().shape({
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

export const CategoryForm: React.FC = () => {
  const { category } = useAppSelector(CategorySelectors.getForm());

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: category
      ? category
      : {
          id: "",
          name: "",
        },
    validationSchema: category
      ? validationUpdateCategory
      : validationUpdateCategory.concat(validationCreateCategory),
    validateOnChange: false,
    onSubmit: (values) => {
      if (category !== null) return handleUpdateCategory(values);
      else handleCreateCategory(values);
    },
  });

  const handleCreateCategory = async (values) => {
    const result = await dispatch(CategoryThunks.create(values));
    if (CategoryThunks.create.rejected.match(result)) return formik.setSubmitting(false);

    NotificationUtil.success("Đã thêm loại sản phẩm thành công");
    formik.resetForm();
  };

  const handleUpdateCategory = async (values) => {
    if (!category) return;
    const editedFields = FormUtil.getDirtyValues(values, formik.initialValues);
    const result = await dispatch(
      CategoryThunks.update({ id: category.id, category: editedFields })
    );
    if (CategoryThunks.update.rejected.match(result)) return formik.setSubmitting(false);
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
            name="id"
            placeholder="Ví dụ: CB123456"
            onTextChange={formik.setFieldValue}
            required
            value={formik.values.id}
            variant="outlined"
            error={!!formik.errors.id}
            helperText={formik.errors.id}
          />
        </Grid>

        <Grid item md={12} xs={12}>
          <TextFieldCustom
            fullWidth
            label="Tên loại sản phẩm"
            name="name"
            placeholder="Ví dụ: Burger"
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
          title={formik.isSubmitting ? "Đang xử lý..." : !category ? "Thêm mới" : "Lưu"}
        />
      </Box>
    </Box>
  );
};
