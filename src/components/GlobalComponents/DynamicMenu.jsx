import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Edit as EditIcon } from "../../icons/edit";
import { Delete as DeleteIcon } from "../../icons/delete";
import { Show as ShowIcon } from "../../icons/show";
import { EditPen as EditPenIcon } from "../../icons/editPen";
import DynamicModal from "./DynamicModal";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import ConfirmDialog from "../ConfirmDialog";

export default function DynamicMenu({ item, model }) {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const open = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <>
      <DynamicModal
        item={item}
        setOpenModal={setOpenModal}
        open={openModal}
        model={model}
      />
      <IconButton
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClickMenu}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleOpenModal}>
          <EditPenIcon fontSize="small" />
          &nbsp; {t("edit")}
        </MenuItem>
        {/* <MenuItem>
          <Link href={{ pathname: `/${model}/${item._id}` }}>
            <p style={{ color: "#000", textDecoration: "none" }}>
              <ShowIcon fontSize="small" />
              &nbsp; {t("show")}
            </p>
          </Link>
        </MenuItem> */}
        <MenuItem>
          <ConfirmDialog
            model={model}
            id={item.id}
            setOpen={setOpenMenu}
            open={openMenu}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
