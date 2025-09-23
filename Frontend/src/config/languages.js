/**
 * Language Configuration
 * Centralized configuration for supported languages and their properties
 */

// Supported Languages Configuration
export const SUPPORTED_LANGUAGES = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    dir: 'ltr',
    enabled: true,
    default: true,
  },
  {
    code: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    flag: '🇮🇳',
    dir: 'ltr',
    enabled: true,
    default: false,
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    dir: 'ltr',
    enabled: true,
    default: false,
  },
];

// Language Detection Configuration
export const LANGUAGE_DETECTION = {
  order: ['localStorage', 'navigator', 'htmlTag'],
  lookupLocalStorage: 'i18nextLng',
  caches: ['localStorage'],
  checkWhitelist: true,
};

// Fallback Configuration
export const FALLBACK_LANGUAGE = {
  code: 'en',
  name: 'English',
};

// Language Switching Configuration
export const LANGUAGE_SWITCHING = {
  PERSISTENCE: {
    STORAGE_KEY: 'selectedLanguage',
    EXPIRY_DAYS: 30,
  },
  VALIDATION: {
    ENABLED: true,
    STRICT_MODE: false,
  },
  ERROR_HANDLING: {
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000,
  },
};

// RTL (Right-to-Left) Support
export const RTL_SUPPORT = {
  ENABLED: false,
  LANGUAGES: [],
  AUTO_DETECT: false,
};

// Language-specific Formatting
export const LANGUAGE_FORMATTING = {
  en: {
    dateFormat: 'MM/DD/YYYY',
    timeFormat: 'HH:mm',
    currency: 'USD',
    numberFormat: 'en-US',
  },
  ml: {
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    currency: 'INR',
    numberFormat: 'en-IN',
  },
  hi: {
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    currency: 'INR',
    numberFormat: 'en-IN',
  },
};

// Content Direction Helpers
export const getDirection = (languageCode) => {
  const language = SUPPORTED_LANGUAGES.find(lang => lang.code === languageCode);
  return language ? language.dir : 'ltr';
};

export const isRTL = (languageCode) => {
  return getDirection(languageCode) === 'rtl';
};

// Language Validation
export const isLanguageSupported = (languageCode) => {
  return SUPPORTED_LANGUAGES.some(lang => lang.code === languageCode && lang.enabled);
};

// Get Language Info
export const getLanguageInfo = (languageCode) => {
  return SUPPORTED_LANGUAGES.find(lang => lang.code === languageCode) || null;
};

// Get Default Language
export const getDefaultLanguage = () => {
  return SUPPORTED_LANGUAGES.find(lang => lang.default) || SUPPORTED_LANGUAGES[0];
};

// Get Enabled Languages
export const getEnabledLanguages = () => {
  return SUPPORTED_LANGUAGES.filter(lang => lang.enabled);
};

export default {
  SUPPORTED_LANGUAGES,
  LANGUAGE_DETECTION,
  FALLBACK_LANGUAGE,
  LANGUAGE_SWITCHING,
  RTL_SUPPORT,
  LANGUAGE_FORMATTING,
  getDirection,
  isRTL,
  isLanguageSupported,
  getLanguageInfo,
  getDefaultLanguage,
  getEnabledLanguages,
};
