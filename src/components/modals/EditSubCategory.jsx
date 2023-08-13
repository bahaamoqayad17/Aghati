import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useState, useEffect } from "react";
import { create } from "@/store/SubCategoriesSlice";
import { update } from "@/store/SubCategoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { index } from "@/store/MainCategoriesSlice";
import { useTranslation } from "react-i18next";

const style = {
  marginBottom: "30px",
};

export default function EditSubCategory(props) {
  const { t } = useTranslation();
  const { all } = useSelector(({ mainCategories }) => mainCategories);
  const dispatch = useDispatch();
  const [item, setItem] = useState(props.item);
  const [mediaFile, setMediaFile] = useState(props?.item?.image);

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
    formData.append("CategoryId", item?.CategoryId);

    if (props.item?.id) {
      formData.append("SubCategoryId", item?.id);
      dispatch(update(formData));
    } else {
      dispatch(create(formData));
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
          onChange={handleChange}
          sx={style}
          id="outlined-select-currency"
          value={item?.Category?.nameAR}
          defaultValue={item?.Category?.id}
          select
          fullWidth
          name="CategoryId"
          label={t("category")}
          autoComplete="category"
        >
          {all?.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.nameAR}
            </MenuItem>
          ))}
        </TextField>
        <input type="file" name="image" style={style} onChange={handleChange} />

        <br />
        {mediaFile && !mediaFile.name && (
          <img
            src={`https://aghaty.globalinx.net/uploads/${mediaFile}`}
            alt="Image"
            width={"100"}
            height={"100%"}
          />
        )}

        {mediaFile && mediaFile.name && (
          <img
            src={URL.createObjectURL(mediaFile)}
            alt="New Image"
            width={"100"}
            height={"100%"}
          />
        )}
        <br />
        <Button onClick={FormSubmit} variant="contained">
          {t("save")}
        </Button>
      </Box>
    </>
  );
}
