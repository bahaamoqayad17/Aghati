import Head from "next/head";
import Box from "@mui/material/Box";
import Layout from "../components/dashboard/Layout";
import { useTranslation } from "react-i18next";
import { store } from "@/store";

const lngs = {
  ar: { nativeName: "Arabic" },
  en: { nativeName: "English" },
};

const Page = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{`${process.env.APP_NAME} | Dashboard`}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        {t("test")}
      </Box>
    </>
  );
};

Page.getLayout = (page) => <Layout>{page}</Layout>;

export default Page;
