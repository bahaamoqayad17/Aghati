import { useEffect } from "react";
import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import { resources } from "@/lib/resources";
import DynamicMenu from "./DynamicMenu";
import { CircularProgress } from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { deleteDeliveryRecords } from "@/store/DeliverySlice";
import { deleteSellerRecords } from "@/store/SellerSlice";

export default function DataTable({
  items,
  getPagination,
  count,
  model,
  loading,
}) {
  const { t } = useTranslation();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  useEffect(() => {
    getPagination(page, limit);
  }, [page, limit]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const getFieldValue = (object, field) => {
    const fieldPath = field.split(".");
    let value = object;
    for (let path of fieldPath) {
      value = value[path];
      if (value === undefined) break;
    }

    if (field === "image") {
      return (
        <img
          src={`https://aghaty.globalinx.net/uploads/${object.image}`}
          alt="Image"
          width={"100"}
          height={"100%"}
        />
      );
    }

    if (field === "createdAt" || field === "startDate" || field === "endDate") {
      return new Date(object[field]).toDateString();
    }

    return value;
  };
  const dispatch = useDispatch();

  const handleDeleteOrder = (id) => {
    if (window.confirm(t("delete_record"))) {
      if (model === "sellers_reports") {
        dispatch(deleteSellerRecords(id));
      } else {
        dispatch(deleteDeliveryRecords(id));
      }
    }
  };

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                {resources[model]?.headers?.map((header) => (
                  <TableCell key={header} color="textPrimary" variant="body1">
                    {t(header)}
                  </TableCell>
                ))}
                {model === "messages" || model === "records" ? (
                  ""
                ) : (
                  <TableCell>{t("actions")}</TableCell>
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
                {items?.map((item) => (
                  <TableRow hover key={item.id}>
                    {resources[model]?.fields?.map((field) => (
                      <TableCell
                        key={field}
                        color="textPrimary"
                        variant="body1"
                      >
                        {getFieldValue(item, field)}
                      </TableCell>
                    ))}
                    {model === "messages" ||
                    model === "sellers_reports" ||
                    model === "deliveries_reports" ||
                    model === "records" ? (
                      ""
                    ) : (
                      <TableCell>
                        <DynamicMenu model={model} item={item} />
                      </TableCell>
                    )}
                    {model === "sellers_reports" ||
                    model === "deliveries_reports" ? (
                      <TableCell width={"200"}>
                        <Button
                          color="success"
                          onClick={() =>
                            Router.push(
                              model === "sellers_reports"
                                ? `/financials/sellers/${item.id}`
                                : `/financials/deliveries/${item.id}`
                            )
                          }
                        >
                          <PaidIcon />
                        </Button>
                        <Button
                          color="error"
                          onClick={() => handleDeleteOrder(item.id)}
                        >
                          <PointOfSaleIcon />
                        </Button>
                      </TableCell>
                    ) : (
                      ""
                    )}
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </Box>
      </PerfectScrollbar>

      {model === "sellers" && (
        <TablePagination
          component="div"
          count={count}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[10]}
        />
      )}
    </Card>
  );
}
