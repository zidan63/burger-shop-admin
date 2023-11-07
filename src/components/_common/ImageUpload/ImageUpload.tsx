import { Button, Box, Typography } from "@mui/material";
import { useImperativeHandle, useRef, useState } from "react";
import { UploadFile } from "@mui/icons-material";

interface Props {
  imageUploadBoxRef?: any;
  imageUrl?: string;
}

export const ImageUploadComp: React.FC<Props> = ({ imageUploadBoxRef, imageUrl = "" }) => {
  // const { fileUploadBoxRef } = props;
  const [imageBase64, setImageBase64] = useState<string>(imageUrl);
  const [imageFile, setImageFile] = useState<any>(null);

  console.log(imageBase64);
  useImperativeHandle(imageUploadBoxRef, () => ({
    getImage: () => {
      return imageFile;
    },
    setImageState: (image: string) => {
      setImageBase64(image);
    },
  }));

  const fileInputRef = useRef<any>(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleUpLoadImages = (event) => {
    const image = event.target.files[0];

    if (image) {
      let base64String;
      let reader = new FileReader();
      console.log("next");

      reader.onload = function () {
        base64String = reader.result;
        setImageBase64(base64String);
        setImageFile(image);
        // console.log(base64String);
        // console.log(image);
      };
      reader.readAsDataURL(image);
    }
  };

  return (
    <Box sx={{}}>
      {/* <Box sx={{ borderBottom: "1px solid #ced4da", padding: "10px 16px" }}> */}
      <Button
        sx={{
          border: "1px solid #ced4da",
          borderRadius: "4px",
          padding: "12px 10px",
          marginBottom: "10px",
        }}
        onClick={handleUploadClick}
      >
        <UploadFile />
        <Typography sx={{ marginLeft: "5px", fontSize: "16px" }}>Chọn ảnh mô tả</Typography>
        <input
          ref={fileInputRef}
          hidden
          type="file"
          accept=".png, .jpg"
          multiple
          onChange={(event) => handleUpLoadImages(event)}
        />
      </Button>
      {/* </Box> */}
      {imageBase64 && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            // padding: "26px 16px",
            color: "#BEBFBC",
            border: "1px solid #ced4da",
            borderRadius: "15px",
            overflow: "hidden",
            height: "500px",
          }}
        >
          <img style={{ width: "100%", objectFit: "contain" }} src={imageBase64} />
        </Box>
      )}

      {!imageBase64 && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            padding: "26px 16px",
            color: "#BEBFBC",
            border: "1px solid #ced4da",
            borderRadius: "4px",
          }}
        >
          <Typography sx={{ fontSize: "17px" }}>Chưa có ảnh được chọn</Typography>
        </Box>
      )}
    </Box>
  );
};
