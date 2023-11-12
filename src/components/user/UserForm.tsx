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
import { Role } from "@services/role";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const validationUpdateUser = Yup.object().shape({
  fullName: Yup.string()
    .required("Họ và tên bắt buộc nhập!")
    .min(6, "Họ và tên tối thiểu 6 kí tự!")
    .max(100, "Họ và tên tối đa 100 kí tự!"),
  email: Yup.string()
    .required("Email bắt buộc nhập!")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email chưa đúng định dạng! Phải có @, sau @ có tối thiểu 3 kí tự tiếp theo là có dấu chấm. Ví dụ: hoten@abc.com"
    ),
  role: Yup.object().required("Bắt buộc chọn vai trò!"),
  username: Yup.string()
    .required("Tài khoản bắt buộc nhập!")
    .min(6, "Tài khoản tối thiểu 6 kí tự!")
    .max(30, "Tài khoản tối đa 30 kí tự!")
    .matches(/^\S*$/, "Tài khoản không được chứa khoảng trắng!"),
});

const validationCreateUser = Yup.object().shape({
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

export const UserForm: React.FC = () => {
  const { user } = useAppSelector(UserSelectors.getForm());
  const { roles } = useAppSelector(RoleSelectors.getAll());

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: user
      ? { ...user, password: "", passwordRetype: "" }
      : {
          fullName: "",
          phone: "",
          email: "",
          username: "",
          password: "",
          passwordRetype: "",
          role: null,
        },
    validationSchema: user
      ? validationUpdateUser
      : validationUpdateUser.concat(validationCreateUser),
    validateOnChange: false,
    onSubmit: (values) => {
      if (user !== null) return handleUpdateUser(values);
      else handleCreateUser(values);
    },
  });

  const roleSelected = useMemo(() => {
    return roles.find((r) => formik.values.role?.id === r.id);
  }, [roles, formik.values.role]);

  const handleCreateUser = async (values) => {
    const result = await dispatch(UserThunks.create(values));
    if (UserThunks.create.rejected.match(result)) return formik.setSubmitting(false);

    NotificationUtil.success("Đã thêm người dùng thành công");
    formik.resetForm();
  };

  const handleUpdateUser = async (values) => {
    if (!user) return;
    const result = await dispatch(UserThunks.update(values));
    if (UserThunks.update.rejected.match(result)) return formik.setSubmitting(false);
    NotificationUtil.success("Đã chỉnh sửa người dùng thành công");
  };

  const handleRoleChange = (value: Role | null) => {
    formik.setFieldValue("role", value);
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
            label="Họ và tên"
            name="fullName"
            placeholder="Ví dụ: Nguyễn Văn A"
            onTextChange={formik.setFieldValue}
            required
            value={formik.values.fullName}
            variant="outlined"
            error={!!formik.errors.fullName}
            helperText={formik.errors.fullName}
          />
        </Grid>

        <Grid item md={12} xs={12}>
          <TextFieldCustom
            fullWidth
            label="Email"
            name="email"
            placeholder="Ví dụ: nguyenvana@gmail.com"
            onTextChange={formik.setFieldValue}
            type="email"
            required
            value={formik.values.email}
            variant="outlined"
            error={!!formik.errors.email}
            helperText={formik.errors.email}
          />
        </Grid>

        <Grid item md={12} xs={12}>
          <Autocomplete
            // multiple
            id="select-role"
            options={roles}
            value={roleSelected}
            onChange={(e, value) => {
              handleRoleChange(value);
            }}
            ListboxProps={{
              style: {
                maxHeight: "210px",
              },
            }}
            disableCloseOnSelect
            getOptionLabel={(option) => `(${option.code}) ${option.name}`}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {`(${option.code}) ${option.name}`}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Vai trò"
                required
                placeholder="Nhập mã vai trò, tên vai trò..."
                error={!!formik.errors.role}
                helperText={formik.errors.role}
              />
            )}
          />
        </Grid>

        <Grid item md={12} xs={12}>
          <TextFieldCustom
            fullWidth
            label="Tên đăng nhập"
            name="username"
            placeholder="Ví dụ: nguyenvana"
            onTextChange={formik.setFieldValue}
            required
            value={formik.values.username}
            variant="outlined"
            error={!!formik.errors.username}
            helperText={formik.errors.username}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <TextFieldCustom
            password
            type="password"
            fullWidth
            label="Mật khẩu"
            name="password"
            placeholder="Ví dụ: Abcd@1234"
            onTextChange={formik.setFieldValue}
            required={!user}
            value={formik.values.password}
            variant="outlined"
            error={!!formik.errors.password}
            helperText={formik.errors.password}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <TextFieldCustom
            password
            fullWidth
            type="password"
            label="Nhập lại mật khẩu"
            name="passwordRetype"
            placeholder="Ví dụ: Abcd@1234"
            onTextChange={formik.setFieldValue}
            required={!user}
            value={formik.values.passwordRetype}
            variant="outlined"
            error={!!formik.errors.passwordRetype}
            helperText={formik.errors.passwordRetype}
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
          title={formik.isSubmitting ? "Đang xử lý..." : !user ? "Thêm mới" : "Lưu"}
        />
      </Box>
    </Box>
  );
};
