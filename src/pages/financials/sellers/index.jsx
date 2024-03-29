import Head from "next/head";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SvgIcon from "@mui/material/SvgIcon";
import Layout from "@/components/dashboard/Layout";
import DynamicModal from "@/components/GlobalComponents/DynamicModal";
import DataTable from "@/components/GlobalComponents/DataTable";
import { Search } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { index } from "@/store/SellerSlice";
const Page = () => {
  const { count, all, loading } = useSelector(({ sellers }) => sellers);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const getPagination = (page, limit) => {
    page++;
    // dispatch(index({ offset: page, limit }));
  };
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModel = () => {
    setOpenModal(true);
  };

  const search = (e) => {
    const value = e.target.value;
    if (e.key === "Enter") {
      if (value) {
        dispatch(index({ name: value }));
      } else {
        dispatch(index());
      }
    }
  };

  useEffect(() => {
    dispatch(index());
  }, []);

  return (
    <>
      <Head>
        <title>{`${process.env.APP_NAME} | Sellers Reports`}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Box>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                mb: 5,
              }}
            >
              <Typography sx={{ m: 1 }} variant="h3">
                {t("all_sellers_reports")}
              </Typography>
              <Box sx={{ m: 1 }}>
                {/* <DynamicModal
                  setOpenModal={setOpenModal}
                  open={openModal}
                  model="sellers"
                />

                <Button
                  onClick={handleOpenModel}
                  color="primary"
                  variant="contained"
                >
                  {t("add_seller")}
                </Button> */}
              </Box>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Card>
                <CardContent>
                  <Box sx={{ maxWidth: 500 }}>
                    <TextField
                      onKeyPress={(e) => search(e)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SvgIcon color="action" fontSize="small">
                              <Search />
                            </SvgIcon>
                          </InputAdornment>
                        ),
                      }}
                      placeholder={t("search_sellers")}
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
          <Box sx={{ mt: 3 }}>
            <DataTable
              getPagination={getPagination}
              model={"sellers_reports"}
              loading={loading}
              items={all}
              count={count}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <Layout>{page}</Layout>;

export default Page;
