import * as Yup from "yup";

import { Autocomplete, Box, Checkbox, Chip, Divider, Grid, TextField } from "@mui/material";
import { ProductSelectors, ProductThunks } from "@store/product";
import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@store";

import { ButtonCustom } from "@components/_common/ButtonCustom";
import { Category } from "@services/category";
import { CategorySelectors } from "@store/category";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { ImageUploadComp } from "@components/_common/ImageUpload";
import { NotificationUtil } from "@utils/NotificationUtil";
import { Stack } from "@mui/system";
import { Supplier } from "@services/supplier";
import { SupplierSelectors } from "@store/supplier";
import { TextFieldCustom } from "@components/_common/TextFieldCustom";
import { Topping } from "@services/topping";
import { ToppingSelectors } from "@store/topping";
import { fileService } from "@services/file/FileService";
import { useFormik } from "formik";
import { useRef } from "react";

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
  supplier: Yup.object().required("Nhà cung cấp bắt buộc chọn!"),
  category: Yup.object().required("Loại sản phẩm bắt buộc chọn!"),
});

export const ProductForm: React.FC = () => {
  const { product } = useAppSelector(ProductSelectors.getForm());
  const { categories } = useAppSelector(CategorySelectors.getAll());
  const { suppliers } = useAppSelector(SupplierSelectors.getAll());
  const { toppings } = useAppSelector(ToppingSelectors.getAll());
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
          toppings: [] as Topping[],
          supplier: null,
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

  const supplierSelected = useMemo(() => {
    return suppliers.find((s) => formik.values.supplier?.id === s.id);
  }, [suppliers, formik.values.supplier]);

  const categorySelected = useMemo(() => {
    return categories.find((s) => formik.values.category?.id === s.id);
  }, [categories, formik.values.category]);

  const toppingsSelected = useMemo(() => {
    const colorIds = formik.values.toppings.map((c) => c.id);
    return toppings.filter((s) => colorIds.includes(s.id));
  }, [toppings, formik.values.toppings]);

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

  const handleSupplierChange = (value: Supplier | null) => {
    formik.setFieldValue("supplier", value);
  };

  const handleCategoryChange = (value: Category | null) => {
    formik.setFieldValue("category", value);
  };

  const handleToppingChange = (value: Topping[]) => {
    formik.setFieldValue("toppings", value);
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
            id="select-supplier"
            options={suppliers}
            value={supplierSelected || null}
            onChange={(e, value) => {
              handleSupplierChange(value);
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
                error={!!formik.errors.supplier}
                helperText={formik.errors.supplier}
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
            options={toppings}
            value={toppingsSelected}
            onChange={(e, values) => {
              handleToppingChange(values);
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
                        backgroundTopping: option.code,
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
                      backgroundTopping: option.code,
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
                label="Topping"
                placeholder="Nhập mã topping, tên topping..."
                error={!!formik.errors.toppings}
                helperText={formik.errors.toppings}
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
