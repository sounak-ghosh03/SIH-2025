/**
 * UI Configuration Constants
 * Centralized configuration for UI elements, themes, and styling
 */

// Brand Configuration
export const BRAND = {
  NAME: process.env.REACT_APP_BRAND_NAME || 'Digital Health Passport',
  LOGO_ALT: 'Digital Health Passport Logo',
};

// Theme Configuration
export const THEME = {
  BOOTSTRAP: {
    VARIANT: process.env.REACT_APP_THEME_VARIANT || 'primary',
    BACKGROUND: process.env.REACT_APP_THEME_BACKGROUND || 'primary',
    TEXT: process.env.REACT_APP_THEME_TEXT || 'dark',
  },
  CUSTOM: {
    PRIMARY_COLOR: process.env.REACT_APP_PRIMARY_COLOR || '#007bff',
    SECONDARY_COLOR: process.env.REACT_APP_SECONDARY_COLOR || '#6c757d',
    ACCENT_COLOR: process.env.REACT_APP_ACCENT_COLOR || '#28a745',
  },
};

// Icon Configuration
export const ICONS = {
  USER: 'FaUser',
  LOGOUT: 'FaSignOutAlt',
  GLOBE: 'FaGlobe',
  HOME: 'FaHome',
  DASHBOARD: 'FaTachometerAlt',
  SETTINGS: 'FaCog',
};

// Animation Configuration
export const ANIMATION = {
  DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
  },
  EASING: {
    DEFAULT: 'ease-in-out',
    BOUNCE: 'ease-out',
  },
};

// Layout Configuration
export const LAYOUT = {
  NAVBAR: {
    EXPAND: 'lg',
    STICKY: 'top',
    CONTAINER: 'fluid',
  },
  SIDEBAR: {
    WIDTH: '250px',
    COLLAPSED_WIDTH: '60px',
  },
};

// Loading States
export const LOADING = {
  SKELETON: {
    HEIGHT: '1.5rem',
    BORDER_RADIUS: '0.375rem',
  },
  SPINNER: {
    SIZE: 'sm',
    COLOR: '#007bff',
  },
};

// Error States
export const ERROR = {
  RETRY_DELAY: 1000,
  MAX_RETRIES: 3,
  TIMEOUT: 5000,
};

// Accessibility
export const A11Y = {
  ARIA_LABELS: {
    NAVIGATION: 'Main navigation',
    LANGUAGE_SWITCHER: 'Language selection menu',
    USER_MENU: 'User account menu',
    LOGOUT_BUTTON: 'Sign out',
  },
  ROLES: {
    NAVIGATION: 'navigation',
    MAIN: 'main',
    COMPLEMENTARY: 'complementary',
  },
};

export default {
  BRAND,
  THEME,
  ICONS,
  ANIMATION,
  LAYOUT,
  LOADING,
  ERROR,
  A11Y,
};
