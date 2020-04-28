import i18n from "i18next"
import Backend from "i18next-xhr-backend"
import LanguageDetector from "i18next-browser-languagedetector"
import { reactI18nextModule } from "react-i18next"

const resources = {
  en: {
    common: {
      "Welcome to React": "Welcome to React and react-i18next"
    }
  }
  uz: {
    common: {
      "Welcome to React": "React va react-i18nextga xush kelibsiz"
    }
  }
};


i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    resources,
    fallbackLng: "en",
    lng: 'en',
    // have a common namespace used around the full app
    ns: ["common"],
    defaultNS: "common",

    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    react: {
      wait: true,
    },
  })

export default i18n