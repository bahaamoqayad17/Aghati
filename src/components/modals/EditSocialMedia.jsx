import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { create } from "@/store/SocialMediaSlice";
import { update } from "@/store/SocialMediaSlice";
import { t } from "i18next";
import { useDispatch } from "react-redux";

const style = {
  marginBottom: "30px",
};

export default function EditSocialMedia(props) {
  const dispatch = useDispatch();
  const [item, setitem] = useState(props.item);

  const handleChange = (e) => {
    setitem({ ...item, [e.target.name]: e.target.value });
  };

  const FormSubmit = async (e) => {
    e.preventDefault();
    if (props.item?.id) {
      dispatch(update({ ...item, SocialMediaId: item.id }));
    } else {
      dispatch(create(item));
    }
  };
  return (
    <>
      <Box>
        <h1 style={style}>{t("social_media")}</h1>
        <TextField
          sx={style}
          label={t("type")}
          onChange={handleChange}
          value={item?.type}
          name="type"
          fullWidth
        />
        <TextField
          sx={style}
          label={t("link")}
          onChange={handleChange}
          value={item?.link}
          name="link"
          fullWidth
        />
        <Button onClick={FormSubmit} variant="contained">
          {t("save")}
        </Button>
      </Box>
    </>
  );
}
