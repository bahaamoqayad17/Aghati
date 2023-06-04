import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { create } from "@/store/DeliverySlice";
import { update } from "@/store/DeliverySlice";
import { t } from "i18next";
import { useDispatch } from "react-redux";

const style = {
  marginBottom: "30px",
};

export default function EditDelivery(props) {
  const dispatch = useDispatch();
  const [item, setitem] = useState(props.item);

  const handleChange = (e) => {
    setitem({ ...item, [e.target.name]: e.target.value });
  };

  const FormSubmit = async (e) => {
    e.preventDefault();
    if (props.item?.id) {
      dispatch(update({ ...item, DeliveryId: item.id }));
    } else {
      dispatch(create(item));
    }
  };
  return (
    <>
      <Box>
        <h1 style={style}>{t("delivery")}</h1>
        <TextField
          sx={style}
          label={t("first_name")}
          onChange={handleChange}
          value={item?.firstName}
          name="firstName"
          fullWidth
        />
        <TextField
          sx={style}
          label={t("last_name")}
          onChange={handleChange}
          value={item?.lastName}
          name="lastName"
          fullWidth
        />
        <TextField
          sx={style}
          label={t("mobile_number")}
          onChange={handleChange}
          value={item?.mobile}
          name="mobile"
          fullWidth
        />
        <TextField
          sx={style}
          label={t("password")}
          onChange={handleChange}
          value={item?.password}
          name="password"
          type="password"
          fullWidth
        />
        <Button onClick={FormSubmit} variant="contained">
          {t("save")}
        </Button>
      </Box>
    </>
  );
}
