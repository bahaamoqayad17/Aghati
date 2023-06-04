import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { ar } from "./ar";
import { en } from "./en";
import { ku } from "./ku";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      ar,
      en,
      ku,
    },
    lng: "ar",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
