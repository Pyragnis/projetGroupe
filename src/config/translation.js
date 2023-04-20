//pour éviter un problème de de tyle:
//i18next::pluralResolver: Your environement seems not to be Intl API compatible, use an INtl.pluralRules polyfill. will fallback to the compatibilityJson v3 format handling..
import 'intl';
import 'intl/locale-data/jsonp/en';
// i18n est le module qui comporte les outils pour la internationalisation (les langues)
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./translation/en";
import fr from "./translation/fr";
// on peut précisé les angue souhaité dans "resources"
// chaque clé correspond a une langue (en, fr ...)
// i18n ne marche que les chose en dur (pas pour les api par exemple)
const resources = {
  en,
  fr
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false // react already safes from xss
  }
});
