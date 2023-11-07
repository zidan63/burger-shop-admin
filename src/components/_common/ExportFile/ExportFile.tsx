import DialogCustom from "@components/_common/DialogCustom/DialogCustom";
import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import { TextFieldCustom } from "../TextFieldCustom";
import { ButtonCustom } from "../ButtonCustom";
import * as Yup from "yup";
import { useFormik } from "formik";
import useDidUpdate from "@hooks/useDidUpdate";

type ExportFileValues = {
  fileName: string;
  isAllPage: boolean;
  pageFrom: number;
  pageTo: number;
};

export type ExportFileProps = {
  open: boolean;
  setOpen: any;
  totalPage: number;
  onExportFile: (values: ExportFileValues) => Promise<void>;
};

const validationSchema = Yup.object().shape({
  fileName: Yup.string().required("Tên file bắt buộc nhập!"),
});

export const ExportFile: React.FC<ExportFileProps> = ({
  open,
  setOpen,
  totalPage,
  onExportFile,
}) => {
  const formik = useFormik<ExportFileValues>({
    initialValues: {
      fileName: "",
      isAllPage: true,
      pageFrom: 1,
      pageTo: totalPage,
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      if (values.isAllPage) return onExportFile(values);

      if (!values.pageFrom) {
        return formik.setFieldError("pageFrom", "Từ trang bắt buộc nhập!");
      } else if (typeof +values.pageFrom != "number") {
        return formik.setFieldError("pageFrom", "Từ trang phải là số!");
      } else if (values.pageFrom < 1) {
        return formik.setFieldError("pageFrom", "Từ trang phải lớn hơn 0!");
      } else if (values.pageFrom > values.pageTo) {
        return formik.setFieldError("pageFrom", "Từ trang phải nhỏ hơn đến trang!");
      }

      if (!values.pageTo) {
        return formik.setFieldError("pageTo", "Đến trang bắt buộc nhập!");
      } else if (typeof +values.pageTo != "number") {
        return formik.setFieldError("pageTo", "Đến trang phải là số!");
      } else if (values.pageTo < 1) {
        return formik.setFieldError("pageTo", "Đến trang phải lớn hơn 0!");
      } else if (values.pageTo > totalPage) {
        return formik.setFieldError("pageTo", "Đến trang phải nhỏ hơn tổng số trang!");
      }

      await onExportFile(values);
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  useDidUpdate(() => {
    formik.setFieldValue("totalPage", totalPage);
  }, [totalPage]);

  return (
    <DialogCustom
      open={open}
      onClose={handleClose}
      title={"Tùy chọn xuất file"}
      subTitle={"Nhập thông tin vào các ô tương ứng"}
      style={{
        dialog: {
          "& .MuiDialog-paperScrollBody": { maxWidth: "800px" },
        },
        dialogContent: {
          width: { lg: "800px" },
        },
      }}
    >
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
              label="Tên file excel"
              name="fileName"
              placeholder="Ví dụ: TenFile"
              onTextChange={formik.setFieldValue}
              required
              value={formik.values.fileName}
              variant="outlined"
              error={!!formik.errors.fileName}
              helperText={formik.errors.fileName}
            />
          </Grid>

          <Grid item md={12} xs={12}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Số trang</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="allPage"
                name="radio-buttons-group"
                onChange={(e) => {
                  const isAll = e.target.value === "allPage";
                  formik.setFieldValue("isAllPage", isAll);
                  formik.setErrors({});
                }}
              >
                <FormControlLabel
                  value="allPage"
                  control={<Radio />}
                  label={"Tất cả trang trong bảng: " + totalPage + " trang"}
                />
                <FormControlLabel
                  value="customPage"
                  control={<Radio />}
                  label="Tùy chỉnh số trang cần thiết"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item md={6} xs={6}>
            <TextFieldCustom
              fullWidth
              label="Từ trang"
              name="pageFrom"
              type="number"
              placeholder="Ví dụ: 1"
              onTextChange={formik.setFieldValue}
              disabled={formik.values.isAllPage}
              required
              value={formik.values.pageFrom}
              variant="outlined"
              error={!!formik.errors.pageFrom}
              helperText={formik.errors.pageFrom}
            />
          </Grid>

          <Grid item md={6} xs={6}>
            <TextFieldCustom
              fullWidth
              label="Đến trang"
              name="pageTo"
              type="number"
              placeholder="Ví dụ: 100"
              disabled={formik.values.isAllPage}
              onTextChange={formik.setFieldValue}
              required
              value={formik.values.pageTo}
              variant="outlined"
              error={!!formik.errors.pageTo}
              helperText={formik.errors.pageTo}
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
            title={formik.isSubmitting ? "Đang xử lý..." : "Xuất file"}
          />
        </Box>
      </Box>
    </DialogCustom>
  );
};
