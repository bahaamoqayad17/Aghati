import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { create } from "@/store/DiscountCodeSlice";
import { update } from "@/store/DiscountCodeSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const style = {
  marginBottom: "30px",
};

export default function EditDiscountCode(props) {
  const dispatch = useDispatch();
  const [item, setitem] = useState(props.item);
  const [startDate, setStartDate] = useState(props?.item?.startDate);
  const [endDate, setEndDate] = useState(props?.item?.endDate);
  const { t } = useTranslation();

  const handleChange = (e) => {
    setitem({ ...item, [e.target.name]: e.target.value });
  };

  const FormSubmit = async (e) => {
    e.preventDefault();
    if (props.item?.id) {
      dispatch(update({ ...item, DiscountCodeId: item.id }));
    } else {
      dispatch(create(item));
    }
  };
  return (
    <>
      <Box>
        <h1 style={style}>{t("discount_code")}</h1>
        <TextField
          sx={style}
          label={t("code")}
          onChange={handleChange}
          value={item?.code}
          name="code"
          fullWidth
        />
        <TextField
          sx={style}
          label={t("discount")}
          onChange={handleChange}
          value={item?.discount}
          name="discount"
          fullWidth
        />

        <p>{t("startDate")}</p>
        <input
          style={{
            marginBottom: "30px",
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          type="date"
          name="startDate"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
            const selectedDate = new Date(e.target.value);
            const formattedDate = `${selectedDate.getDate()}/${
              selectedDate.getMonth() + 1
            }/${selectedDate.getFullYear()}`;
            setitem({ ...item, startDate: formattedDate });
          }}
        />

        <p>{t("endDate")}</p>

        <input
          style={{
            marginBottom: "30px",
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          type="date"
          name="endDate"
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
            const selectedDate = new Date(e.target.value);
            const formattedDate = `${selectedDate.getDate()}/${
              selectedDate.getMonth() + 1
            }/${selectedDate.getFullYear()}`;
            setitem({ ...item, endDate: formattedDate });
          }}
        />

        <Button onClick={FormSubmit} variant="contained">
          {t("save")}
        </Button>
      </Box>
    </>
  );
}
