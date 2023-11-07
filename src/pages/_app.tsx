import { Provider as ReduxProvider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../config/theme";

import type { NextPageWithLayout } from "@types";
import type { AppProps } from "next/app";
import { store } from "@store/store";
import { Notification } from "@components/_common/Notification";
import { createEmotionCache } from "@utils/CreateEmotionCache";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = (props: AppPropsWithLayout) => {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Notification />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </ReduxProvider>
    </LocalizationProvider>
  );
};

export default App;
