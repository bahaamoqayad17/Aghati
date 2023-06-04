import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { registerChartJs } from "../utils/register-chart-js";
import { theme } from "../theme";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import "@/lang/i18";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "../store";
import { Provider } from "react-redux";

registerChartJs();

const clientSideEmotionCache = createEmotionCache();

export default function App(props) {
  const { i18n } = useTranslation();
  const lang = globalThis.localStorage?.getItem("i18nextLng");

  useEffect(() => {
    if (lang === "ar" || lang === "ku") {
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
    }
    i18n.changeLanguage(lang);
  }, [lang]);

  let cacheRtl;

  if (lang === "ar" || lang === "ku") {
    cacheRtl = createCache({
      key: "muirtl",
      stylisPlugins: [prefixer, rtlPlugin],
    });
  } else {
    cacheRtl = createCache({
      key: "muirtl",
      stylisPlugins: [prefixer],
    });
  }

  if (lang === "ar" || lang === "ku") {
    import("../theme/DataTable-ar.css");
  }

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <CacheProvider value={cacheRtl}>
        <Head>
          <title>{`${process.env.APP_NAME}`}</title>
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <ToastContainer />
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}
