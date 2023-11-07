import * as React from "react";
import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Box } from "@mui/material";
import { NotificationUtil } from "@utils/NotificationUtil";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface AlertSuccessProps {
  isOpen?: boolean;
  message?: string;
}
export const NotificationSuccess: React.FC<AlertSuccessProps> = ({
  isOpen = false,
  message: messageExternal = "",
}) => {
  const [open, setOpen] = useState(isOpen);
  const [message, setMessage] = useState(messageExternal);

  useEffect(() => {
    NotificationUtil.configSuccess((message) => {
      setOpen(true);
      setMessage(message);
    });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <Alert
        severity="success"
        sx={{
          width: "100%",
          color: "green",
          backgroundColor: "white",
          border: "1px solid green",
        }}
      >
        <Box>{message}</Box>
      </Alert>
    </Snackbar>
  );
};
