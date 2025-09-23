// Centralized configuration for feature flags, routes, and labels.
// Values here can be dynamically updated or fetched from backend if needed.
const CONFIG = {
  ROUTES: {
    LOGIN: "/login",
    REGISTER: "/register",
  },
  FEATURES: {
    ENABLE_EMAIL_VERIFICATION: true,
  },
  LABELS: {
    REGISTER_SUCCESS: "Registration successful! Redirecting to login...",
    PASSWORD_MISMATCH: "Passwords do not match",
    FILL_ALL_FIELDS: "Please fill in all fields",
    LOADING_MESSAGE: "Creating Account...",
  },
};

export default CONFIG;
