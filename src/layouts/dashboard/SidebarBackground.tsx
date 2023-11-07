import { Box } from "@mui/material";
import { ColorPallet } from "@config/theme";

export const SidebarBackground = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: -1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: ColorPallet.mainColor.slideBar,
        display: "flex",
        alignContent: "flex-start",
      }}
    >
      <img
        src={"/static/images/moutain.jpg"}
        style={{
          opacity: 0.2,
          width: "100%",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          objectFit: "cover",
        }}
      />
    </Box>
  );
};
