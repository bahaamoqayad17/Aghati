import { removeBanner } from "@/store/BannerSlice";
import { removeDelivery } from "@/store/DeliverySlice";
import { removeDiscountCode } from "@/store/DiscountCodeSlice";
import { removeMainCategory } from "@/store/MainCategoriesSlice";
import { removeSeller } from "@/store/SellerSlice";
import { removeSocialMedia } from "@/store/SocialMediaSlice";
import { removeSubCategory } from "@/store/SubCategoriesSlice";

export const resources = {
  sellers: {
    headers: ["first_name", "last_name", "address", "status"],
    fields: ["firstName", "lastName", "address", "status"],
    remove: removeSeller,
  },
  mainCategories: {
    headers: ["name", "image", "created_at"],
    fields: ["nameAR", "image", "createdAt"],
    remove: removeMainCategory,
  },
  subCategories: {
    headers: ["name", "image", "category_parent", "created_at"],
    fields: ["nameAR", "image", "Category.nameAR", "createdAt"],
    remove: removeSubCategory,
  },
  banners: {
    headers: ["image", "created_at"],
    fields: ["image", "createdAt"],
    remove: removeBanner,
  },
  discountCode: {
    headers: ["code", "discount", "startDate", "endDate"],
    fields: ["code", "discount", "startDate", "endDate"],
    remove: removeDiscountCode,
  },
  messages: {
    headers: ["name", "mobile_number", "message"],
    fields: ["name", "phone", "msgBody"],
  },
  deliveries: {
    headers: ["first_name", "last_name", "status", "mobile_number"],
    fields: ["firstName", "lastName", "status", "mobile"],
    remove: removeDelivery,
  },
  socialMedia: {
    headers: ["name", "link"],
    fields: ["type", "link"],
    remove: removeSocialMedia,
  },
  deliverySubCategory: {
    headers: ["name", "image", "delivery_price", "created_at"],
    fields: ["nameAR", "image", "deliveryPrice", "createdAt"],
  },
  deliveries_reports: {
    headers: ["first_name", "last_name", "status", "mobile_number"],
    fields: ["firstName", "lastName", "status", "mobile"],
  },
  sellers_reports: {
    headers: ["first_name", "last_name", "address", "status"],
    fields: ["firstName", "lastName", "address", "status"],
  },
  records: {
    headers: ["name", "status", "total_price", "date"],
    fields: ["name", "status", "totalPrice", "date"],
  },
};
