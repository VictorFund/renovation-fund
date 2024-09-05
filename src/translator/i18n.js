import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // supportedLngs:['en','uk','ru'],
        fallbackLng: {
            'uk': ['ru'],
        'default': ['en']
    },
    // fallbackLng:false,
    // preload:false,
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['cookie','localStorage','sessionStorage', 'navigator', 'htmlTag','path' ]
        },
        lookupCookie: 'i18next',
    },
);

export default i18n;