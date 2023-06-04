import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { create } from "@/store/BannerSlice";
import { update } from "@/store/BannerSlice";
import { t } from "i18next";
import { useDispatch } from "react-redux";

const style = {
  marginBottom: "30px",
};

export default function EditBanner(props) {
  const dispatch = useDispatch();
  const [item, setItem] = useState(props.item);
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setImageFile(e.target.files[0]);
    } else {
      setItem({ ...item, [e.target.name]: e.target.value });
    }
  };

  const FormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", imageFile);

    if (props.item?.id) {
      formData.append("BannerId", item?.id);
      dispatch(update(formData));
    } else {
      dispatch(create(formData));
    }
  };

  return (
    <>
      <Box>
        <h1 style={style}>{t("banner")}</h1>
        <input type="file" name="image" style={style} onChange={handleChange} />
        <br />
        <Button onClick={FormSubmit} variant="contained">
          {t("save")}
        </Button>
      </Box>
    </>
  );
}
