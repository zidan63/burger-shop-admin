import { Box, Divider, Grid } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "@store";
import { PhotoshopPicker } from "react-color";

import { TextFieldCustom } from "@components/_common/TextFieldCustom";
import React, { useRef } from "react";
import * as Yup from "yup";
import { ButtonCustom } from "@components/_common/ButtonCustom";

import { NotificationUtil } from "@utils/NotificationUtil";
import { ColorSelectors, ColorThunks } from "@store/color";

const validationColor = Yup.object().shape({
  code: Yup.string()
    .required("Mã màu bắt buộc nhập!")
    .min(3, "Mã màu tối thiểu 3 kí tự!")
    .max(15, "Mã màu tối đa 15 kí tự!"),
  name: Yup.string()
    .required("Tên màu bắt buộc nhập!")
    .min(6, "Tên màu tối thiểu 6 kí tự!")
    .max(100, "Tên màu tối đa 100 kí tự!"),
});

export const ColorForm: React.FC = () => {
  const { color } = useAppSelector(ColorSelectors.getForm());

  const dispatch = useAppDispatch();
  const inputColorRef = useRef<any>();

  const formik = useFormik({
    initialValues: color
      ? color
      : {
          code: "",
          name: "",
        },
    validationSchema: validationColor,
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
    const result = await dispatch(ColorThunks.update(values));
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
            label="Tên màu"
            name="name"
            placeholder="Ví dụ: Màu đen"
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
            label="Mã màu"
            name="code"
            placeholder="Ví dụ: #000000"
            inputRef={inputColorRef}
            required
            value={formik.values.code}
            variant="outlined"
            error={!!formik.errors.code}
            helperText={formik.errors.code}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item md={12} xs={12}></Grid>
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
