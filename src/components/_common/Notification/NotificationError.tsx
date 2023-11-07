import { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogTitle, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import DialogCustom from "../DialogCustom/DialogCustom";
import { NotificationUtil } from "@utils/NotificationUtil";
import useDidUpdate from "@hooks/useDidUpdate";

interface NotificationErrorProps {
  messages?: string[];
  isOpen?: boolean;
}

export const NotificationError: React.FC<NotificationErrorProps> = ({
  messages: messagesExternal = [],
  isOpen = false,
}) => {
  const [open, setOpen] = useState(isOpen);
  const [messages, setMessages] = useState(messagesExternal);

  useEffect(() => {
    NotificationUtil.configError((messages) => {
      setOpen(true);
      setMessages((prev) => [...messages, ...prev]);
    });
  }, []);

  useDidUpdate(() => {
    if (open) return;
    setMessages([]);
  }, [open]);

  const handleClickSubmit = () => {
    setOpen(false);
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
            color: "red",
            pt: 0,
          }}
        >
          <ErrorOutlineIcon sx={{ fontSize: "80px" }} />
          <Box>Đã có lỗi xảy ra !!!</Box>
        </DialogTitle>
        <Box
          sx={{
            border: "1px solid red",
            padding: "8px",
            borderRadius: "5px",
            height: "150px",
            width: "100%",
            overflow: "auto",
          }}
        >
          {messages.map((mess: string, index: number) => {
            return (
              <Box
                key={index}
                sx={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start" }}
              >
                <Typography sx={{ fontSize: 18 }}>
                  <FiberManualRecordIcon sx={{ fontSize: "8px", mr: "6px" }} />
                  {mess}
                </Typography>
              </Box>
            );
          })}
        </Box>
        <Box sx={{ mt: "20px" }}>
          <Button variant="contained" color="error" onClick={handleClickSubmit}>
            Xác nhận
          </Button>
        </Box>
      </Box>
    </DialogCustom>
  );
};
