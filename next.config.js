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
  serverRuntimeConfig: {
    port: process.env.NEXT_PUBLIC_APP_PORT || 3000,
  },
  rewrites: () => {
    return [
      {
        source: "/api/file/download",
        destination: `${process.env.NEXT_PUBLIC_URL_SERVER_API}/api/file/download`,
      },
    ];
  },
};

module.exports = nextConfig;
