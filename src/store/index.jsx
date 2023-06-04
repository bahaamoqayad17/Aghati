import { configureStore } from "@reduxjs/toolkit";
import RootSlice from "./RootSlice";
import SellerSlice from "./SellerSlice";
import DeliverySlice from "./DeliverySlice";
import BannerSlice from "./BannerSlice";
import MessagesSlice from "./MessagesSlice";
import DiscountCodeSlice from "./DiscountCodeSlice";
import MainCategoriesSlice from "./MainCategoriesSlice";
import SubCategoriesSlice from "./SubCategoriesSlice";
import AuthSlice from "./AuthSlice";
import SocialMediaSlice from "./SocialMediaSlice";

export const store = configureStore({
  reducer: {
    root: RootSlice,
    sellers: SellerSlice,
    delivries: DeliverySlice,
    banners: BannerSlice,
    messages: MessagesSlice,
    discountCodes: DiscountCodeSlice,
    mainCategories: MainCategoriesSlice,
    subCategories: SubCategoriesSlice,
    auth: AuthSlice,
    socialMedia: SocialMediaSlice,
  },
});
