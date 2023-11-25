/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: false,
  },
  output: "standalone",
  modularizeImports: {
    "@mui/material": {
      transform: "@mui/material/{{member}}",
    },
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
    "@mui/styles": {
      transform: "@mui/styles/{{member}}",
    },
    "@mui/lab": {
      transform: "@mui/lab/{{member}}",
    },
  },
  reactStrictMode: false,
  rewrites: () => {
    return [
      {
        source: "/api/file/download",
        destination: "http://localhost:3000/api/file/download", // Chuyển hướng các yêu cầu API đến máy chủ
      },
    ];
  },
};

module.exports = nextConfig;
