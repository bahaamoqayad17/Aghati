import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { create } from "@/store/SellerSlice";
import { update } from "@/store/SellerSlice";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { index } from "@/store/MainCategoriesSlice";
import MenuItem from "@mui/material/MenuItem";

const style = {
  marginBottom: "30px",
};

const roles = [
  {
    value: "productSeller",
    label: "Product Seller",
  },
  {
    value: "serviceSeller",
    label: "Service Seller",
  },
];

export default function EditSeller(props) {
  const { all } = useSelector(({ mainCategories }) => mainCategories);
  const dispatch = useDispatch();
  const [item, setitem] = useState(props.item);

  const handleChange = (e) => {
    setitem({ ...item, [e.target.name]: e.target.value });
  };

  const FormSubmit = async (e) => {
    if (props.item?.id) {
      console.log("I am Here");
      dispatch(update({ ...item, SellerId: item.id }));
    } else {
      dispatch(create(item));
    }
  };

  useEffect(() => {
    dispatch(index());
  }, []);

  return (
    <>
      <Box>
        <h1 style={style}>{t("seller")}</h1>
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
          sx={style}
          label={t("address")}
          onChange={handleChange}
          value={item?.address}
          name="address"
          fullWidth
        />

        <TextField
          onChange={handleChange}
          sx={style}
          id="outlined-select-currency"
          value={item?.Category?.nameAR}
          select
          defaultValue={item?.id ? item?.Category?.nameAR : "category"}
          fullWidth
          name="CategoryId"
          label={t("category")}
          autocomplete="category"
        >
          {all?.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.nameAR}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          onChange={handleChange}
          sx={style}
          id="outlined-select-currency"
          value={item?.role}
          defaultValue={item?.id ? item?.role : "productSeller"}
          select
          fullWidth
          name="role"
          label={t("role")}
          autocomplete="role"
        >
          {roles?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <br />
        <Button onClick={FormSubmit} variant="contained">
          {t("save")}
        </Button>
      </Box>
    </>
  );
}
