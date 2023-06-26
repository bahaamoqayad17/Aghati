import { removeBanner } from "@/store/BannerSlice";
import { removeDelivery } from "@/store/DeliverySlice";
import { removeDiscountCode } from "@/store/DiscountCodeSlice";
import { removeMainCategory } from "@/store/MainCategoriesSlice";
import { removeSeller } from "@/store/SellerSlice";
import { removeSocialMedia } from "@/store/SocialMediaSlice";
import { removeSubCategory } from "@/store/SubCategoriesSlice";

export const resources = {
  sellers: {
    headers: ["first_name", "last_name", "address", "status", "category"],
    fields: ["firstName", "lastName", "address", "status", "Category.nameAR"],
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
    headers: ["first_name", "last_name", "address"],
    fields: ["firstName", "lastName", "mobile"],
    remove: removeDelivery,
  },
  socialMedia: {
    headers: ["name", "link"],
    fields: ["type", "link"],
    remove: removeSocialMedia,
  },
};
