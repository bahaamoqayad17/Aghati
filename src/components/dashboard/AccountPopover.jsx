import PropTypes from "prop-types";
import { Box, MenuItem, MenuList, Popover, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function AccountPopover(props) {
  const { t } = useTranslation();
  const { anchorEl, onClose, open, ...other } = props;
  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
    onClose?.();
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: "300px" },
      }}
      {...other}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">
          <span>{t("account")}</span>
        </Typography>
        <Typography color="text.secondary" variant="body2">
          <span>User Name</span>
        </Typography>
      </Box>
      <MenuList
        disablePadding
        sx={{
          "& > *": {
            "&:first-of-type": {
              borderTopColor: "divider",
              borderTopStyle: "solid",
              borderTopWidth: "1px",
            },
            padding: "12px 16px",
          },
        }}
      >
        <MenuItem onClick={handleSignOut}>{t("logout")}</MenuItem>
      </MenuList>
    </Popover>
  );
}

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
