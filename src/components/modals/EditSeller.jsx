import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { create } from "@/store/SellerSlice";
import { update } from "@/store/SellerSlice";
import { useDispatch, useSelector } from "react-redux";
import { index } from "@/store/MainCategoriesSlice";
import MenuItem from "@mui/material/MenuItem";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [item, setItem] = useState(props.item);
  const [marker, setMarker] = useState({
    lat: props?.item?.lat || 33.312805,
    lng: props?.item?.long || 44.361488,
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.MAP_KEY,
  });

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const FormSubmit = (e) => {
    if (props.item?.id) {
      dispatch(update({ ...item, SellerId: item.id }));
    } else {
      dispatch(create(item));
    }
  };

  const handleMapClick = (event) => {
    const { latLng } = event;
    const newMarker = {
      lat: latLng.lat(),
      lng: latLng.lng(),
    };
    setMarker(newMarker);
    setItem({ ...item, lat: newMarker.lat, long: newMarker.lng });
  };

  useEffect(() => {
    dispatch(index());
  }, []);

  return (
    <>
      <Box>
        <h1 style={style}>{t("seller")}</h1>
        <Box sx={{ display: "flex" }}>
          <TextField
            sx={style}
            label={t("first_name")}
            onChange={handleChange}
            value={item?.firstName}
            name="firstName"
            fullWidth
          />
          &nbsp; &nbsp; &nbsp;
          <TextField
            sx={style}
            label={t("last_name")}
            onChange={handleChange}
            value={item?.lastName}
            name="lastName"
            fullWidth
          />
          &nbsp; &nbsp; &nbsp;
          <TextField
            sx={style}
            label={t("mobile_number")}
            onChange={handleChange}
            value={item?.mobile}
            name="mobile"
            fullWidth
          />
        </Box>

        <TextField
          sx={style}
          label={t("password")}
          onChange={handleChange}
          value={item?.password}
          name="password"
          type="password"
          fullWidth
        />
        <Box sx={{ display: "flex" }}>
          <TextField
            sx={style}
            label={t("address")}
            onChange={handleChange}
            value={item?.address}
            name="address"
            fullWidth
          />
          &nbsp; &nbsp; &nbsp;
          <TextField
            sx={style}
            label={t("city")}
            onChange={handleChange}
            value={item?.city}
            name="city"
            fullWidth
          />
          &nbsp; &nbsp; &nbsp;
          <TextField
            sx={style}
            label={t("street")}
            onChange={handleChange}
            value={item?.street}
            name="street"
            fullWidth
          />
          &nbsp; &nbsp; &nbsp;
          <TextField
            sx={style}
            label={t("buildNumber")}
            onChange={handleChange}
            value={item?.buildNumber}
            name="buildNumber"
            fullWidth
          />
        </Box>

        <Box display={"flex"}>
          <TextField
            sx={style}
            label={t("serviceType")}
            onChange={handleChange}
            value={item?.serviceType}
            name="serviceType"
            fullWidth
          />
          &nbsp; &nbsp; &nbsp;
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
              <MenuItem key={option?.id} value={option?.id}>
                {option?.nameAR}
              </MenuItem>
            ))}
          </TextField>
          &nbsp; &nbsp; &nbsp;
          <TextField
            onChange={handleChange}
            sx={style}
            id="outlined-select-currency"
            value={item?.role}
            defaultValue={item?.id ? item?.role : ""}
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
        </Box>

        <Box sx={{ display: "flex" }}>
          <TextField
            sx={style}
            label={t("latitude")}
            value={marker.lat}
            fullWidth
          />
          &nbsp; &nbsp; &nbsp;
          <TextField
            sx={style}
            label={t("longitude")}
            value={marker.lng}
            fullWidth
          />
        </Box>

        {isLoaded && (
          <Box sx={{ height: 250, width: "100%" }}>
            <Box width="100%" height="100%">
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "100%",
                }}
                center={{ lat: 33.312805, lng: 44.361488 }}
                zoom={5.5}
                onClick={handleMapClick}
              >
                <Marker position={{ lat: marker.lat, lng: marker.lng }} />
              </GoogleMap>
            </Box>
          </Box>
        )}
        <br />
        <Button onClick={FormSubmit} variant="contained">
          {t("save")}
        </Button>
      </Box>
    </>
  );
}
