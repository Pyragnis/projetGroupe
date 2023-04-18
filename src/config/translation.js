// i18n est le module qui comporte les outils pour la internationalisation (les langues)
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { addPluralRulesPolyfill, } from 'intl-pluralrules';

import en from "./translation/en";
import fr from "./translation/fr";
// on peut précisé les angue souhaité dans "resources"
// chaque clé correspond a une langue (en, fr ...)
// i18n ne marche que les chose en dur (pas pour les api par exemple)
const resources = {
  en,
  fr
};

addPluralRulesPolyfill();

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false // react already safes from xss
  }
});
