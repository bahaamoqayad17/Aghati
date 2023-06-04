import { useState, useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import LangMenu from "../components/dashboard/LangMenu";
import Image from "next/image";
import { login } from "../store/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { CheckToken } from "@/lib/CheckToken";
import { useRouter } from "next/router";

const Page = () => {
  const { isLoggedIn } = useSelector(({ auth }) => auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [tab, setTab] = useState("email");
  const [user, setUser] = useState({});
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleTabChange = (event, value) => {
    setTab(value);
  };

  const handleSubmit = () => {
    dispatch(login(user));
  };

  useEffect(() => {
    if (isLoggedIn || CheckToken()) {
      router.push("/");
    }
  }, [isLoggedIn]);

  return (
    <>
      <Head>
        <title>{`${process.env.APP_NAME} | Login`}</title>
      </Head>
      <Box
        component="main"
        sx={{
          display: "flex",
          flex: "1 1 auto",
        }}
      >
        <Grid container sx={{ flex: "1 1 auto" }}>
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              backgroundColor: "neutral.50",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                p: 3,
              }}
            >
              {/* <NextLink href="/login" passHref>
                <a><img src="Png.png" width="50" height="50" /></a>
              </NextLink> */}
            </Box>
            <Box
              sx={{
                flex: "1 1 auto",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  maxWidth: 500,
                  px: 3,
                  py: "100px",
                  width: "100%",
                }}
              >
                <div>
                  <Typography sx={{ mb: 1 }} variant="h4">
                    <Box
                      display={"flex"}
                      justifyContent="space-between"
                      alignItems={"center"}
                      sx={{ my: 2 }}
                    >
                      <p style={{ margin: 0 }}>{t("welcome")}</p>
                      <LangMenu />
                    </Box>
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{ mb: 3 }}
                    variant="body2"
                  >
                    {t("Sign_up_on_the_internal_platform")}
                  </Typography>
                  <Tabs onChange={handleTabChange} sx={{ mb: 3 }} value={tab}>
                    <Tab label={t("login")} value="email" />
                  </Tabs>
                  <TextField
                    label={t("mobile_number")}
                    fullWidth
                    name="mobile"
                    onChange={handleChange}
                    margin="normal"
                  />
                  <TextField
                    label={t("password")}
                    fullWidth
                    margin="normal"
                    type="password"
                    name="password"
                    onChange={handleChange}
                  />
                  <Button
                    fullWidth
                    size="large"
                    sx={{ mt: 3 }}
                    onClick={handleSubmit}
                    variant="contained"
                  >
                    {t("login")}
                  </Button>
                </div>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              alignItems: "center",
              background:
                "radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)",
              color: "white",
              display: "flex",
              justifyContent: "center",
              "& img": {
                maxWidth: "100%",
              },
            }}
          >
            <Box sx={{ p: 3 }}>
              <Image src="/logo.png" alt="test" width="700" height="700" />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Page;
