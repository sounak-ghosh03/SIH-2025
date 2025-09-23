import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslations from '../locales/en.json';
import mlTranslations from '../locales/ml.json';
import hiTranslations from '../locales/hi.json';

// Custom language detector for Kerala region
const keralaLanguageDetector = {
  name: 'keralaLanguageDetector',

  lookup() {
    // Check localStorage first
    const stored = localStorage.getItem('i18nextLng');
    if (stored) return stored;

    // Check browser language
    const browserLang = navigator.language || navigator.userLanguage;

    // Map browser languages to supported languages
    if (browserLang.startsWith('ml')) return 'ml'; // Malayalam
    if (browserLang.startsWith('hi')) return 'hi'; // Hindi
    if (browserLang.startsWith('en')) return 'en'; // English

    // Default to English
    return 'en';
  },

  cacheUserLanguage(lng) {
    localStorage.setItem('i18nextLng', lng);
  }
};

// Date and number formatting for different locales
export const formatters = {
  en: {
    date: new Intl.DateTimeFormat('en-GB'),
    number: new Intl.NumberFormat('en-IN'),
    currency: new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    })
  },
  ml: {
    date: new Intl.DateTimeFormat('ml-IN'),
    number: new Intl.NumberFormat('en-IN'),
    currency: new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    })
  },
  hi: {
    date: new Intl.DateTimeFormat('hi-IN'),
    number: new Intl.NumberFormat('en-IN'),
    currency: new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    })
  }
};

// i18next configuration
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // Resources
    resources: {
      en: {
        translation: enTranslations
      },
      ml: {
        translation: mlTranslations
      },
      hi: {
        translation: hiTranslations
      }
    },

    // Language detection options
    detection: {
      order: ['keralaLanguageDetector', 'localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage']
    },

    // Default settings
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',

    // Interpolation options
    interpolation: {
      escapeValue: false, // React already escapes values
    },

    // React options
    react: {
      useSuspense: false,
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
    }
  });

// Language change handler
i18n.on('languageChanged', (lng) => {
  // Update document direction for RTL languages if needed
  document.documentElement.lang = lng;
  document.documentElement.dir = i18n.dir(lng);

  // Update moment locale if using moment.js
  // if (window.moment) {
  //   window.moment.locale(lng);
  // }

  console.log(`Language changed to: ${lng}`);
});

// Export formatters for use in components
export const formatDate = (date, locale = i18n.language) => {
  const formatter = formatters[locale] || formatters.en;
  return formatter.date.format(new Date(date));
};

export const formatNumber = (number, locale = i18n.language) => {
  const formatter = formatters[locale] || formatters.en;
  return formatter.number.format(number);
};

export const formatCurrency = (amount, locale = i18n.language) => {
  const formatter = formatters[locale] || formatters.en;
  return formatter.currency.format(amount);
};

// Helper function to get available languages
export const getAvailableLanguages = () => [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' }
];

// Helper function to change language
export const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
};

// Helper function to get current language info
export const getCurrentLanguage = () => {
  const currentLng = i18n.language;
  return getAvailableLanguages().find(lang => lang.code === currentLng) || getAvailableLanguages()[0];
};

export default i18n;
