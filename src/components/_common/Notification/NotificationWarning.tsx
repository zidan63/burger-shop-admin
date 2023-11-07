import { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogTitle, Typography } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import DialogCustom from "../DialogCustom/DialogCustom";
import { NotificationUtil } from "@utils/NotificationUtil";

interface NotificationWarningProps {
  message?: string;
  isOpen?: boolean;
  onClick?: () => void;
}

export const NotificationWarning: React.FC<NotificationWarningProps> = ({
  message: messageExternal = "",
  isOpen = false,
  onClick,
}) => {
  const [open, setOpen] = useState(isOpen);
  const [message, setMessage] = useState(messageExternal);

  useEffect(() => {
    NotificationUtil.configWarning((message) => {
      setOpen(true);
      setMessage(message);
    });
  }, []);

  const handleClickCancel = () => {
    setOpen(false);
    NotificationUtil.cancel();
  };

  const handleClickSubmit = () => {
    if (onClick) onClick();
    setOpen(false);
    NotificationUtil.accept();
  };

  return (
    <DialogCustom open={open}>
      <Box
        sx={{
          width: "320px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "orange",
            pt: 0,
          }}
        >
          <WarningAmberIcon sx={{ fontSize: "80px" }} />
          <Box>Cảnh báo !!!</Box>
        </DialogTitle>
        <Box
          sx={{
            border: "1px solid orange",
            padding: "8px",
            borderRadius: "5px",
            height: "150px",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start" }}>
            <Typography sx={{ fontSize: 18 }}>
              <FiberManualRecordIcon sx={{ fontSize: "8px", mr: "6px" }} />
              {message}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: "20px", display: "flex", justifyContent: "center", gap: "15px" }}>
          <Button variant="outlined" color="warning" onClick={handleClickSubmit}>
            Đồng ý
          </Button>
          <Button variant="contained" color="warning" onClick={handleClickCancel}>
            Hủy bỏ
          </Button>
        </Box>
      </Box>
    </DialogCustom>
  );
};
