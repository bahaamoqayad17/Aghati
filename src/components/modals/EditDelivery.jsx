import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { create } from "@/store/DeliverySlice";
import { update } from "@/store/DeliverySlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const style = {
  marginBottom: "30px",
};

const types = [
  {
    value: "Taxi cars",
    label: "taxi_cars",
  },
  {
    value: "Transport buses",
    label: "transport_buses",
  },
  {
    value: "Freight",
    label: "freight",
  },
];

export default function EditDelivery(props) {
  const dispatch = useDispatch();
  const [item, setitem] = useState(props.item);
  const { t } = useTranslation();

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

        <TextField
          onChange={handleChange}
          sx={style}
          id="outlined-select-currency"
          value={item?.type}
          defaultValue={item?.type}
          select
          fullWidth
          name="type"
          label={t("type")}
          autoComplete="type"
        >
          {types?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {t(option.label)}
            </MenuItem>
          ))}
        </TextField>

        <Button onClick={FormSubmit} variant="contained">
          {t("save")}
        </Button>
      </Box>
    </>
  );
}
