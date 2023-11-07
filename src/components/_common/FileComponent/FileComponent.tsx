import React from "react";
import { Box, Typography } from "@mui/material";
import { Clear } from "@mui/icons-material";
import { formatBytes } from "@utils/ByteFormat";

interface Props {
  fileType?: string;
  fileName?: string;
  fileSize?: number;
  onDelete?: () => void;
}

export const FileComponent: React.FC<Props> = ({ fileType, fileName, fileSize, onDelete }) => {
  const fileIconSrc = getFileIconSrc(fileName || "");

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        // border: "1px solid black",
        boxShadow:
          " rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;",
        borderRadius: "10px",
        width: "260px",
        padding: "12px 12px",
        backgroundColor: "#fff",
        marginRight: "15px",
        marginBottom: "15px",
      }}
    >
      <img src={fileIconSrc} style={{ width: "40px", height: "40px" }} />
      <Box sx={{ marginLeft: "10px" }}>
        <Box component="h4" sx={{ color: "black", margin: 0 }}>
          {fileName}
        </Box>
        <Typography sx={{ color: "gray" }}>{formatBytes(fileSize)}</Typography>
      </Box>
      <Box
        sx={{ position: "absolute", right: 5, top: 5, cursor: "pointer" }}
        onClick={() => {
          if (onDelete) onDelete();
        }}
      >
        <Clear sx={{ color: "red" }} />
      </Box>
    </Box>
  );
};

const getFileIconSrc = (fileName: string) => {
  const fileType = fileName.split(".")[1];
  switch (fileType) {
    case "docx":
      return "./icons/document/doc.svg";
    case "pdf":
      return "./icons/document/pdf.svg";
    case "xls":
      return "./icons/document/xls.svg";
  }
};
