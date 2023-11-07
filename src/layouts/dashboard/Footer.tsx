import { CardCustom } from "@components/_common/CardCustom";
import { TitleFooterDasboard } from "@config/title";
import { Box } from "@mui/material";

export const Footer = () => {
  return (
    <Box component="footer">
      <CardCustom>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 3,
            justifyContent: { xs: "center", md: "space-between" },
          }}
        >
          <Box sx={{ color: "gray", fontSize: "14px", fontWeight: "500", textAlign: "center" }}>
            {TitleFooterDasboard}
          </Box>
          <Box
            component="img"
            alt="logo globalchain"
            src={"/static/images/logo-footer.png"}
            sx={{ width: "50px" }}
          />
        </Box>
      </CardCustom>
    </Box>
  );
};
