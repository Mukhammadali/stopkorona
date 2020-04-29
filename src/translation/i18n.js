import i18n from "i18next"
import Backend from "i18next-xhr-backend"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"


const resources = {
  en: require('./locales/en.json'),
  uz: require('./locales/uz.json'),
  ru: require('./locales/ru.json'),
};


i18n
  // .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "uz",
    // lng: 'uz',
    // have a common namespace used around the full app
    // ns: ["common"],
    defaultNS: "common",
    detection: {
      lookupLocalStorage: 'stopkorona_uz_locale',
    },

    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    react: {
      wait: true,
    },
  })

export default i18n