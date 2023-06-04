import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { create } from "@/store/MainCategoriesSlice";
import { update } from "@/store/MainCategoriesSlice";
import { t } from "i18next";
import { useDispatch } from "react-redux";

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

export default function EditMainCategory(props) {
  const dispatch = useDispatch();
  const [item, setItem] = useState(props.item);
  const [mediaFile, setMediaFile] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setMediaFile(e.target.files[0]);
    } else {
      setItem({ ...item, [e.target.name]: e.target.value });
    }
  };

  const FormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", mediaFile);
    formData.append("nameEN", item?.nameEN);
    formData.append("nameAR", item?.nameAR);
    formData.append("nameKUR", item?.nameKUR);
    formData.append("role", item?.role);

    if (props.item?.id) {
      formData.append("CategoryId", item.id);
      dispatch(update(formData));
    } else {
      dispatch(create(formData));
    }
  };

  return (
    <>
      <Box>
        <h1 style={style}>{t("main_category")}</h1>
        <TextField
          sx={style}
          label={t("nameEN")}
          onChange={handleChange}
          value={item?.nameEN}
          name="nameEN"
          fullWidth
        />
        <TextField
          sx={style}
          label={t("nameAR")}
          onChange={handleChange}
          value={item?.nameAR}
          name="nameAR"
          fullWidth
        />
        <TextField
          sx={style}
          label={t("nameKUR")}
          onChange={handleChange}
          value={item?.nameKUR}
          name="nameKUR"
          fullWidth
        />
        <TextField
          onChange={handleChange}
          sx={style}
          id="outlined-select-currency"
          value={item?.role}
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
        <input type="file" name="image" style={style} onChange={handleChange} />
        <br />
        <Button onClick={FormSubmit} variant="contained">
          {t("save")}
        </Button>
      </Box>
    </>
  );
}
