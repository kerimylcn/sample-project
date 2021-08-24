import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";

import translationEN from './assets/locales/en/translation.json';
import translationTR from './assets/locales/tr/translation.json';
// the translations
const resources = {
  en: {
    translation: translationEN
  },
  tr:{
    translation:translationTR
  }
};

i18n
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;