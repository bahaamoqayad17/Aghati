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
import { useRouter } from "next/router";
import { getDeliveryRecords } from "@/store/DeliverySlice";
import PerfectScrollbar from "react-perfect-scrollbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import CircularProgress from "@mui/material/CircularProgress";
const Page = () => {
  const { count, all, loading } = useSelector(({ delivries }) => delivries);
  const { id } = useRouter().query;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const getPagination = (page, limit) => {
    page++;
  };

  useEffect(() => {
    dispatch(getDeliveryRecords(id));
  }, [id]);

  return (
    <>
      <Head>
        <title>{`${process.env.APP_NAME} | Delivries Reports`}</title>
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
                {t("all_records")}
              </Typography>
              <Box sx={{ m: 1 }}></Box>
            </Box>
            <Box sx={{ mt: 3 }}></Box>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Card>
              <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {!loading && (
                          <>
                            {all[0]?.Order?.name ? (
                              <>
                                <TableCell>{t("name")}</TableCell>
                                <TableCell>{t("status")}</TableCell>
                                <TableCell>{t("totalPrice")}</TableCell>
                                <TableCell>{t("date")}</TableCell>
                                <TableCell>{t("type")}</TableCell>
                              </>
                            ) : (
                              <>
                                <TableCell>{t("status")}</TableCell>
                                <TableCell>{t("type")}</TableCell>
                                <TableCell>{t("price")}</TableCell>
                              </>
                            )}
                          </>
                        )}
                      </TableRow>
                    </TableHead>
                    {loading ? (
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={20} align="center">
                            <CircularProgress />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    ) : (
                      <TableBody>
                        {all[0]?.Order?.name ? (
                          <>
                            {all?.map((item) => (
                              <TableRow hover key={item.id}>
                                <TableCell>{item.Order?.name}</TableCell>
                                <TableCell>{item.Order?.status}</TableCell>
                                <TableCell>{item.Order?.totalPrice}</TableCell>
                                <TableCell>{item.Order?.date}</TableCell>
                                <TableCell>
                                  {item.OrderDelivery?.type}
                                </TableCell>
                              </TableRow>
                            ))}
                          </>
                        ) : (
                          <>
                            {all?.map((item) => (
                              <TableRow hover key={item?.id}>
                                <TableCell>
                                  {item?.OrderDelivery?.status}
                                </TableCell>
                                <TableCell>
                                  {item?.OrderDelivery?.type}
                                </TableCell>
                                <TableCell>
                                  {item?.OrderDelivery?.price}
                                </TableCell>
                              </TableRow>
                            ))}
                          </>
                        )}
                      </TableBody>
                    )}
                  </Table>
                </Box>
              </PerfectScrollbar>
            </Card>
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <Layout>{page}</Layout>;

export default Page;
