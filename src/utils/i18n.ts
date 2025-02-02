
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      faqTitle: "Frequently Asked Questions",
      selectLanguage: "Select Language",
      prevPage: "Previous",
      nextPage: "Next",
    },
  },
  fr: {
    translation: {
      faqTitle: "Questions fréquemment posées",
      selectLanguage: "Choisir la langue",
      prevPage: "Précédent",
      nextPage: "Suivant",
    },
  },

};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', 
  interpolation: {
    escapeValue: false, 
  },
});

export default i18n;
