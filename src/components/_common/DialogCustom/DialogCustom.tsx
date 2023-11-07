import { Box, Dialog, DialogContent, DialogTitle, Divider, IconButton } from "@mui/material";
import { ReactElement } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface Style {
  dialog?: any;
  dialogTitle?: any;
  dialogContent?: any;
}

type Props = React.PropsWithChildren & {
  title?: string;
  subTitle?: string;
  open: boolean;
  onClose?: () => void;
  style?: Style;
};

const DialogCustom: React.FC<Props> = ({ title, subTitle, open, onClose, children, style }) => {
  return (
    <Dialog open={open} onClose={onClose} scroll={"body"} sx={{ ...style?.dialog }}>
      {title && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <DialogTitle sx={{ ...style?.dialogTitle }}>
            <Box sx={{ fontWeight: "700", fontSize: "18px" }}>{title}</Box>
            <Box sx={{ fontSize: "13px", fontWeight: "500", color: "#495057" }}>{subTitle}</Box>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              mr: 2,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      )}
      {title && <Divider />}

      <DialogContent sx={{ ...style?.dialogContent }}>{children}</DialogContent>
    </Dialog>
  );
};

export default DialogCustom;
