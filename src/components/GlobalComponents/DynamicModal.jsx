import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/RootSlice";
import EditSeller from "../modals/EditSeller";
import EditDiscountCode from "../modals/EditDiscountCode";
import EditDelivery from "../modals/EditDelivery";
import EditMainCategory from "../modals/EditMainCategory";
import EditSubCategory from "../modals/EditSubCategory";
import EditSocialMedia from "../modals/EditSocialMedia";
import EditBanner from "../modals/EditBanner";
import EditDeliverySubCategory from "../modals/EditDeliverySubCategory";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

export default function DynamicModal(props) {
  const { closeAllModals } = useSelector(({ root }) => root);
  const dispatch = useDispatch();
  const handleCloseModal = () => props.setOpenModal(false);

  if (closeAllModals) {
    handleCloseModal();
    dispatch(closeModal(false));
  }
  const componentsName = {
    sellers: EditSeller,
    discountCode: EditDiscountCode,
    deliveries: EditDelivery,
    mainCategories: EditMainCategory,
    subCategories: EditSubCategory,
    banners: EditBanner,
    socialMedia: EditSocialMedia,
    deliverySubCategory: EditDeliverySubCategory,
  };

  const DynamicComponentName = componentsName[props.model];
  return (
    <>
      <Modal
        open={props.open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DynamicComponentName
            item={props.item}
            handleCloseModal={handleCloseModal}
          />
        </Box>
      </Modal>
    </>
  );
}
