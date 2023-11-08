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
import { ProductSelectors, ProductThunks } from "@store/product";
import { SuplierSelectors } from "@store/suplier";
import { Suplier } from "@services/suplier";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const validationUpdateProduct = Yup.object().shape({
  code: Yup.string()
    .required("Mã sản phẩm bắt buộc nhập!")
    .min(6, "Mã sản phẩm tối thiểu 6 kí tự!")
    .max(15, "Mã sản phẩm tối đa 15 kí tự!"),
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

const validationCreateProduct = Yup.object().shape({
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

export const ProductForm: React.FC = () => {
  const { product } = useAppSelector(ProductSelectors.getForm());
  const { supliers } = useAppSelector(SuplierSelectors.getAll());

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: product
      ? product
      : {
          id: "",
          name: "",
          color: "",
          suplierId: "",
          suplierDisplay: "",
        },
    validationSchema: product
      ? validationUpdateProduct
      : validationUpdateProduct.concat(validationCreateProduct),
    validateOnChange: false,
    onSubmit: (values) => {
      if (product !== null) return handleUpdateProduct(values);
      else handleCreateProduct(values);
    },
  });

  const suplierSelected = useMemo(() => {
    return supliers.find((s) => formik.values.roleIds.includes(s.id));
  }, [supliers, formik.values.suplierId]);

  const handleCreateProduct = async (values) => {
    const result = await dispatch(ProductThunks.create(values));
    if (ProductThunks.create.rejected.match(result)) return formik.setSubmitting(false);

    NotificationUtil.success("Đã thêm sản phẩm thành công");
    formik.resetForm();
  };

  const handleUpdateProduct = async (values) => {
    if (!product) return;
    const editedFields = FormUtil.getDirtyValues(values, formik.initialValues);
    const result = await dispatch(ProductThunks.update({ id: product.id, product: editedFields }));
    if (ProductThunks.update.rejected.match(result)) return formik.setSubmitting(false);
    NotificationUtil.success("Đã chỉnh sửa sản phẩm thành công");
  };

  const handleRoleChange = (value: Suplier | null) => {
    if (!value) return;
    formik.setFieldValue("suplierId", value.id);
    formik.setFieldValue("suplierDisplay", value.name);
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
            label="Mã sản phẩm"
            name="code"
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
            label="Tên sản phẩm"
            name="name"
            placeholder="Ví dụ: Burger gà"
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
            label="Giá sản phẩm"
            name="priceSale"
            placeholder="Ví dụ: 30000"
            required
            onTextChange={formik.setFieldValue}
            value={formik.values.priceSale}
            variant="outlined"
            error={!!formik.errors.priceSale}
            helperText={formik.errors.priceSale}
          />
        </Grid>

        <Grid item md={12} xs={12}>
          <Autocomplete
            id="select-suplier"
            options={supliers}
            value={suplierSelected}
            onChange={(e, value) => {
              handleRoleChange(value);
            }}
            ListboxProps={{
              style: {
                maxHeight: "210px",
              },
            }}
            disableCloseOnSelect
            getOptionLabel={(option) => `(${option.id}) ${option.name}`}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {`(${option.id}) ${option.name}`}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Nhà cung cấp"
                required
                placeholder="Nhập mã nhà cung cấp, tên nhà cung cấp..."
                error={!!formik.errors.suplierId}
                helperText={formik.errors.suplierId}
              />
            )}
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
          title={formik.isSubmitting ? "Đang xử lý..." : !product ? "Thêm mới" : "Lưu"}
        />
      </Box>
    </Box>
  );
};
