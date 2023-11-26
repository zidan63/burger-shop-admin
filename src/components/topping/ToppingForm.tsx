import * as Yup from "yup";

import { Box, Divider, Grid } from "@mui/material";
import React, { useRef } from "react";
import { ToppingSelectors, ToppingThunks } from "@store/topping";
import { useAppDispatch, useAppSelector } from "@store";

import { ButtonCustom } from "@components/_common/ButtonCustom";
import { NotificationUtil } from "@utils/NotificationUtil";
import { PhotoshopPicker } from "react-color";
import { TextFieldCustom } from "@components/_common/TextFieldCustom";
import { useFormik } from "formik";

const validationTopping = Yup.object().shape({
  code: Yup.string()
    .required("Mã topping bắt buộc nhập!")
    .min(3, "Mã topping tối thiểu 3 kí tự!")
    .max(15, "Mã topping tối đa 15 kí tự!"),
  name: Yup.string()
    .required("Tên topping bắt buộc nhập!")
    .min(6, "Tên topping tối thiểu 6 kí tự!")
    .max(100, "Tên topping tối đa 100 kí tự!"),
});

export const ToppingForm: React.FC = () => {
  const { topping } = useAppSelector(ToppingSelectors.getForm());

  const dispatch = useAppDispatch();
  const inputToppingRef = useRef<any>();

  const formik = useFormik({
    initialValues: topping
      ? topping
      : {
          code: "",
          name: "",
        },
    validationSchema: validationTopping,
    validateOnChange: false,
    onSubmit: (values) => {
      if (topping !== null) return handleUpdateTopping(values);
      else handleCreateTopping(values);
    },
  });

  const handleCreateTopping = async (values) => {
    const result = await dispatch(ToppingThunks.create(values));
    if (ToppingThunks.create.rejected.match(result)) return formik.setSubmitting(false);

    NotificationUtil.success("Đã thêm topping thành công");
    formik.resetForm();
  };

  const handleUpdateTopping = async (values) => {
    if (!topping) return;
    const result = await dispatch(ToppingThunks.update(values));
    if (ToppingThunks.update.rejected.match(result)) return formik.setSubmitting(false);
    NotificationUtil.success("Đã chỉnh sửa topping thành công");
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
            label="Tên topping"
            name="name"
            placeholder="Ví dụ: Rau xanh"
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
            label="Màu đại diện"
            name="code"
            placeholder="Ví dụ: #000000"
            inputRef={inputToppingRef}
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
        <Grid item md={12} xs={12}>
          <PhotoshopPicker
            styles={{
              default: {
                picker: {
                  width: "100%",
                  boxShadow: "unset",
                },
              },
            }}
            color={formik.values.code}
            onChange={(color) => {
              formik.setFieldValue("code", color.hex);
              if (inputToppingRef.current?.setInnerValue)
                inputToppingRef.current.setInnerValue(color.hex);
            }}
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
          title={formik.isSubmitting ? "Đang xử lý..." : !topping ? "Thêm mới" : "Lưu"}
        />
      </Box>
    </Box>
  );
};
