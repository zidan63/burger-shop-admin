import Head from "next/head";
import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { LoginUsernamePassword } from "@components/login/LoginUsernamePassword";
import { TitleFormLogin, TitleHeaderLogin } from "@config/title";
import { LogoFormLogin, LogoHeaderLogin } from "@config/logo";

const Page = () => {
  return (
    <>
      <Head>
        <title>Đăng nhập</title>
      </Head>

      <Box
        component="main"
        sx={{
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
          background: "url(/static/images/background.svg)",
          backgroundSize: "cover",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 5,
        }}
      >
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"row"}
          position={"fixed"}
          top={20}
          left={30}
        >
          <Box marginRight={1.5}>
            <img
              src={LogoHeaderLogin.url}
              width={LogoHeaderLogin.width}
              height={LogoHeaderLogin.height}
              style={{
                filter: "drop-shadow(6px 6px 4px rgba(0,0,0,.5))",
              }}
              alt="Logo"
            />
          </Box>
          <Typography
            textAlign={"left"}
            color={"primary.contrastText"}
            fontSize={38}
            fontWeight={"bold"}
            lineHeight={"60px"}
            sx={{
              WebkitTextStrokeWidth: ".8px",
              WebkitTextStrokeFillColor: "#FFFFFF",
              WebkitTextStrokeColor: "#000000",
              textShadow: "6px 6px 4px rgba(0,0,0,.5)",
            }}
            fontFamily={"'Grenze', serif;"}
          >
            {TitleHeaderLogin}
          </Typography>
        </Stack>

        <Stack
          alignItems={"center"}
          flexDirection={"column"}
          justifyContent={"flex-start"}
          bgcolor={"primary.contrastText"}
          width={"500px"}
          boxShadow={"4px 4px 8px rgba(0,0,0,.5)"}
          borderRadius={"10px"}
          position={"relative"}
          sx={{ py: 4 }}
        >
          <Stack alignItems={"center"} justifyContent={"center"} flexDirection={"row"}>
            <Box>
              <img
                src={LogoFormLogin.url}
                height={LogoFormLogin.height}
                width={LogoFormLogin.width}
              />
            </Box>
            <Typography
              textAlign={"left"}
              fontSize={"30px"}
              lineHeight={"34px"}
              marginLeft={2}
              fontFamily={"'Grenze', serif;"}
              fontWeight={"normal"}
            >
              {TitleFormLogin}
            </Typography>
          </Stack>
          <LoginUsernamePassword />
        </Stack>
      </Box>
    </>
  );
};

export default Page;
