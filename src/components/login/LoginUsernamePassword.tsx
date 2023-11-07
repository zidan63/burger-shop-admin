import { Box, Button, Grid, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { authService } from "@services/auth/AuthService";
import { TextFieldCustom } from "@components/_common/TextFieldCustom";
import { useRouter } from "next/router";

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Tài khoản bắt buộc nhập!")
    .max(30, "Tên tài khoản tối đa 30 kí tự!"),
  password: Yup.string().max(255).required("Mật khẩu bắt buộc nhập!"),
});

export function LoginUsernamePassword() {
  const route = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      await authService.login(values);
      route.push("/");
    },
  });
  return (
    <Box
      component="form"
      noValidate
      onSubmit={formik.handleSubmit}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{
        padding: "16px 40px",
        paddingTop: "30px",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontSize: 30,
          fontWeight: "700",
        }}
      >
        ĐĂNG NHẬP
      </Typography>
      <Typography
        sx={{
          fontSize: 14,
          color: "#999",
          fontStyle: "italic",
        }}
      >
        Đăng nhập để truy cập hệ thống
      </Typography>

      <Grid container spacing={2} sx={{ mt: 1, mb: 4 }}>
        <Grid item md={12} xs={12}>
          <TextFieldCustom
            fullWidth
            label="Tên đăng nhập"
            name="username"
            placeholder="Nhập tên đăng nhập"
            onChange={formik.handleChange}
            required
            value={formik.values.username}
            variant="outlined"
            error={!!formik.errors.username}
            helperText={formik.errors.username}
          />
        </Grid>

        <Grid item md={12} xs={12}>
          <TextFieldCustom
            password
            fullWidth
            label="Mật khẩu"
            name="password"
            placeholder="Nhập mật khẩu"
            onChange={formik.handleChange}
            required
            value={formik.values.password}
            variant="outlined"
            error={!!formik.errors.password}
            helperText={formik.errors.password}
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        sx={{
          fontSize: "18px",
          fontWeight: "600",
          width: "100%",
        }}
        type="submit"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Đang đăng nhập..." : "  Đăng nhập"}
      </Button>
    </Box>
  );
}
