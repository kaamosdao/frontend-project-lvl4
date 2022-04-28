import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
import resources from './locales/index.js';

const i18nInstance = i18next.createInstance();

i18nInstance
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    resources,
  });

export default i18nInstance;
