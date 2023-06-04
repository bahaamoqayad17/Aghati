import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useState, useEffect } from "react";
import { create } from "@/store/SubCategoriesSlice";
import { update } from "@/store/SubCategoriesSlice";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { index } from "@/store/MainCategoriesSlice";

const style = {
  marginBottom: "30px",
};

export default function EditSubCategory(props) {
  const { all } = useSelector(({ mainCategories }) => mainCategories);
  const dispatch = useDispatch();
  const [item, setitem] = useState(props.item);

  const handleChange = (e) => {
    setitem({ ...item, [e.target.name]: e.target.value });
  };

  const FormSubmit = async (e) => {
    e.preventDefault();
    if (props.item?.id) {
      dispatch(update({ ...item, SubCategoryId: item.id }));
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
        <h1 style={style}>{t("sub_category")}</h1>
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
          sx={style}
          label={t("category_name")}
          onChange={handleChange}
          value={item?.CategoryId}
          name="CategoryId"
          fullWidth
        />
        <TextField
          onChange={handleChange}
          sx={style}
          id="outlined-select-currency"
          value={item?.category?.nameAR}
          select
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
        <input
          type="file"
          name="image"
          style={style}
          value={item?.image}
          onChange={handleChange}
        />
        <br />
        <Button onClick={FormSubmit} variant="contained">
          {t("save")}
        </Button>
      </Box>
    </>
  );
}
