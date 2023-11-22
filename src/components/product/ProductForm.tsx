import { useRef } from "react";
import { Autocomplete, Box, Checkbox, Chip, Divider, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "@store";

import { TextFieldCustom } from "@components/_common/TextFieldCustom";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import React, { useMemo } from "react";
import * as Yup from "yup";
import { ButtonCustom } from "@components/_common/ButtonCustom";

import { NotificationUtil } from "@utils/NotificationUtil";
import { ProductSelectors, ProductThunks } from "@store/product";
import { SuplierSelectors } from "@store/supplier";
import { Suplier } from "@services/supplier";
import { Color } from "@services/color";
import { CategorySelectors } from "@store/category";
import { Category } from "@services/category";
import { ColorSelectors } from "@store/color";
import { Stack } from "@mui/system";
import { ImageUploadComp } from "@components/_common/ImageUpload";
import { fileService } from "@services/file/FileService";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Tên sản phẩm bắt buộc nhập!")
    .min(6, "Tên sản phẩm tối thiểu 6 kí tự!")
    .max(200, "Tên sản phẩm tối đa 200 kí tự!"),
  priceRecipt: Yup.number()
    .required("Giá nhập bắt buộc nhập!")
    .typeError("Giá nhập phải là số!")
    .min(1, "Giá nhập tối thiểu 1 USD"),
  priceSale: Yup.number()
    .required("Giá bán bắt buộc nhập!")
    .typeError("Giá bán phải là số!")
    .min(1, "Giá bán tối thiểu 1 USD"),
  stock: Yup.number().required("Số lượng bắt buộc nhập!").typeError("Số lượng phải là số!"),
  suplier: Yup.object().required("Nhà cung cấp bắt buộc chọn!"),
  category: Yup.object().required("Loại sản phẩm bắt buộc chọn!"),
});

export const ProductForm: React.FC = () => {
  const { product } = useAppSelector(ProductSelectors.getForm());
  const { categories } = useAppSelector(CategorySelectors.getAll());
  const { supliers } = useAppSelector(SuplierSelectors.getAll());
  const { colors } = useAppSelector(ColorSelectors.getAll());
  const imageUploadBoxRef = useRef<any>(null);

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: product
      ? product
      : {
          name: "",
          priceRecipt: 1,
          priceSale: 1,
          stock: 10,
          description: "",
          imageName: "",
          colors: [] as Color[],
          suplier: null,
          category: null,
        },
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      const image = imageUploadBoxRef.current.getImage();
      if (image) {
        const result = await handleUploadFile(image);
        values.imageName = result.imageName;
      }

      if (product !== null) return handleUpdateProduct(values);
      else handleCreateProduct(values);
    },
  });

  const suplierSelected = useMemo(() => {
    return supliers.find((s) => formik.values.suplier?.id === s.id);
  }, [supliers, formik.values.suplier]);

  const categorySelected = useMemo(() => {
    return categories.find((s) => formik.values.category?.id === s.id);
  }, [categories, formik.values.category]);

  const colorsSelected = useMemo(() => {
    const colorIds = formik.values.colors.map((c) => c.id);
    return colors.filter((s) => colorIds.includes(s.id));
  }, [colors, formik.values.colors]);

  const handleUploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return fileService.uploadFile(formData);
  };

  const handleCreateProduct = async (values) => {
    const result = await dispatch(ProductThunks.create(values));
    if (ProductThunks.create.rejected.match(result)) return formik.setSubmitting(false);

    NotificationUtil.success("Đã thêm sản phẩm thành công");
    formik.resetForm();
    imageUploadBoxRef.current.setImageState("");
  };

  const handleUpdateProduct = async (values) => {
    if (!product) return;
    const result = await dispatch(ProductThunks.update(values));
    if (ProductThunks.update.rejected.match(result)) return formik.setSubmitting(false);
    NotificationUtil.success("Đã chỉnh sửa sản phẩm thành công");
  };

  const handleSuplierChange = (value: Suplier | null) => {
    formik.setFieldValue("suplier", value);
  };

  const handleCategoryChange = (value: Category | null) => {
    formik.setFieldValue("category", value);
  };

  const handleColorChange = (value: Color[]) => {
    formik.setFieldValue("colors", value);
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
        <Grid item md={6} xs={12}>
          <Autocomplete
            id="select-suplier"
            options={supliers}
            value={suplierSelected || null}
            onChange={(e, value) => {
              handleSuplierChange(value);
            }}
            ListboxProps={{
              style: {
                maxHeight: "210px",
              },
            }}
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
                label="Nhà cung cấp"
                required
                placeholder="Nhập mã nhà cung cấp, tên nhà cung cấp..."
                error={!!formik.errors.suplier}
                helperText={formik.errors.suplier}
              />
            )}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <Autocomplete
            id="select-category"
            options={categories}
            value={categorySelected || null}
            onChange={(e, value) => {
              handleCategoryChange(value);
            }}
            ListboxProps={{
              style: {
                maxHeight: "210px",
              },
            }}
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
                label="Loại sản phẩm"
                required
                placeholder="Nhập mã loại sản phẩm, tên loại sản phẩm..."
                error={!!formik.errors.category}
                helperText={formik.errors.category}
              />
            )}
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
            label="Giá nhập (USD)"
            name="priceRecipt"
            placeholder="Ví dụ: $10"
            required
            onTextChange={formik.setFieldValue}
            value={formik.values.priceRecipt}
            variant="outlined"
            error={!!formik.errors.priceRecipt}
            helperText={formik.errors.priceRecipt}
          />
        </Grid>

        <Grid item md={12} xs={12}>
          <TextFieldCustom
            fullWidth
            label="Giá bán (USD)"
            name="priceSale"
            placeholder="Ví dụ: $10"
            required
            onTextChange={formik.setFieldValue}
            value={formik.values.priceSale}
            variant="outlined"
            error={!!formik.errors.priceSale}
            helperText={formik.errors.priceSale}
          />
        </Grid>

        <Grid item md={12} xs={12}>
          <TextFieldCustom
            fullWidth
            label="Số lượng"
            name="stock"
            placeholder="Ví dụ: 30"
            required
            onTextChange={formik.setFieldValue}
            value={formik.values.stock}
            variant="outlined"
            error={!!formik.errors.stock}
            helperText={formik.errors.stock}
          />
        </Grid>

        <Grid item md={12} xs={12}>
          <Autocomplete
            multiple
            id="muti-select-color"
            options={colors}
            value={colorsSelected}
            onChange={(e, values) => {
              handleColorChange(values);
            }}
            ListboxProps={{
              style: {
                maxHeight: "210px",
              },
            }}
            disableCloseOnSelect
            getOptionLabel={(option) => `${option.name}`}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip
                  label={option.name}
                  {...getTagProps({ index })}
                  key={option.id}
                  avatar={
                    <Box
                      sx={{
                        backgroundColor: option.code,
                        width: 20,
                        height: 20,
                        borderRadius: 20,
                        mr: 1,
                      }}
                    ></Box>
                  }
                />
              ))
            }
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                <Stack direction={"row"}>
                  <Box
                    sx={{
                      backgroundColor: option.code,
                      width: 20,
                      height: 20,
                      borderRadius: 20,
                      mr: 1,
                    }}
                  ></Box>
                  {`${option.name}`}
                </Stack>
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Màu sắc"
                placeholder="Nhập mã màu, tên màu..."
                error={!!formik.errors.colors}
                helperText={formik.errors.colors}
              />
            )}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <ImageUploadComp
            imageUploadBoxRef={imageUploadBoxRef}
            imageUrl={product ? `/api/file/download?fileName=${product.imageName}` : ""}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            multiline
            fullWidth
            minRows={4.6}
            label="Mô tả sản phẩm"
            name="description"
            placeholder=""
            onChange={(e) => formik.setFieldValue("description", e.target.value)}
            value={formik.values.description}
            variant="outlined"
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
