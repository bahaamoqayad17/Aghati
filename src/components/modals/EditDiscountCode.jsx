import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { create } from "@/store/DiscountCodeSlice";
import { update } from "@/store/DiscountCodeSlice";
import { t } from "i18next";
import { useDispatch } from "react-redux";

const style = {
  marginBottom: "30px",
};

export default function EditDiscountCode(props) {
  const dispatch = useDispatch();
  const [item, setitem] = useState(props.item);

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
        <TextField
          sx={style}
          label={t("startDate")}
          onChange={handleChange}
          value={item?.startDate}
          name="startDate"
          fullWidth
        />
        <TextField
          sx={style}
          label={t("password")}
          onChange={handleChange}
          value={item?.endDate}
          name="endDate"
          fullWidth
        />
        <Button onClick={FormSubmit} variant="contained">
          {t("save")}
        </Button>
      </Box>
    </>
  );
}
