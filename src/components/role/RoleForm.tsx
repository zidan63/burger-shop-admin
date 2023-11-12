import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useCallback } from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { RolePermissionTable } from "./RolePermissionTable";
import { ButtonCustom } from "@components/_common/ButtonCustom";
import { TextFieldCustom } from "@components/_common/TextFieldCustom";
import { RoleSelectors, RoleThunks } from "@store/role";
import { useAppDispatch, useAppSelector } from "@store";
import { NotificationUtil } from "@utils/NotificationUtil";
import { FormUtil } from "@utils/FormUtil";
import { CreateRole, Permission, Role } from "@services/role";

const validationSchema = Yup.object().shape({
  code: Yup.string()
    .required("Mã vai trò bắt buộc nhập!")
    .min(2, "Mã vai trò tối thiểu 6 kí tự!")
    .max(15, "Mã vai trò tối đa 15 kí tự!"),
  name: Yup.string()
    .required("Tên vai trò bắt buộc nhập!")
    .min(6, "Tên vai trò tối thiểu 6 kí tự!")
    .max(30, "Tên vai trò tối đa 30 kí tự!"),

  permissionIds: Yup.array().min(1, "Quyền bắt buộc chọn!"),
});

export const RoleForm: React.FC = () => {
  const { role } = useAppSelector(RoleSelectors.getForm());

  const dispatch = useAppDispatch();

  const formik = useFormik<CreateRole>({
    initialValues: role
      ? role
      : {
          code: "",
          name: "",
          permissions: [] as Permission[],
        },
    validationSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      if (!role) return handleCreateRole(values);
      handleUpdateRole(values);
    },
  });

  const handleCreateRole = async (values) => {
    const result = await dispatch(RoleThunks.create(values));
    if (RoleThunks.create.rejected.match(result)) return;

    NotificationUtil.success("Đã thêm vai trò thành công");
    formik.resetForm();
  };

  const handleUpdateRole = async (values) => {
    if (!role) return;

    const result = await dispatch(RoleThunks.update(values));

    if (RoleThunks.update.rejected.match(result)) return;

    NotificationUtil.success("Đã chỉnh sửa vai trò thành công");
  };

  const handlePermissionChange = useCallback((permissions: Permission[]) => {
    formik.setFieldValue("permissions", permissions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      component="form"
      autoComplete="off"
      noValidate
      onSubmit={formik.handleSubmit}
      sx={{ maxHeight: "70vh" }}
    >
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <TextFieldCustom
            fullWidth
            label="Mã vai trò"
            name="code"
            placeholder="Ví dụ: CB0001"
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
            label="Tên vai trò"
            name="name"
            placeholder="Ví dụ: Phó đội trưởng"
            onTextChange={formik.setFieldValue}
            required
            value={formik.values.name}
            variant="outlined"
            error={!!formik.errors.name}
            helperText={formik.errors.name}
          />
        </Grid>

        <Grid item md={12} xs={12}>
          <Box sx={{ pt: 1, pb: 2 }}>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "17px",
              }}
            >
              Danh sách quyền
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#D14343",
              }}
            >
              {(formik.errors.permissions as any) || ""}
            </Typography>
          </Box>
          <RolePermissionTable
            onChange={handlePermissionChange}
            permissions={formik.values.permissions}
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
          title={formik.isSubmitting ? "Đang xử lý..." : !role ? "Thêm mới" : "Lưu"}
        />
      </Box>
    </Box>
  );
};
