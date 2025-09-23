import axios from 'axios';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;

    if (response) {
      switch (response.status) {
        case 401:
          // Unauthorized - redirect to login
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          window.location.href = '/login';
          break;
        case 403:
          // Forbidden
          console.error('Access forbidden');
          break;
        case 404:
          // Not found
          console.error('Resource not found');
          break;
        case 500:
          // Server error
          console.error('Internal server error');
          break;
        default:
          console.error('API error:', response.status);
      }
    } else {
      // Network error
      console.error('Network error - please check your connection');
    }

    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  // Authentication
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    profile: '/auth/profile',
  },

  // Migrants
  migrants: {
    list: '/migrants',
    create: '/migrants',
    get: (id) => `/migrants/${id}`,
    update: (id) => `/migrants/${id}`,
    delete: (id) => `/migrants/${id}`,
    search: '/migrants/search',
    qr: (id) => `/migrants/${id}/qr`,
  },

  // Health Records
  ehr: {
    list: '/ehr',
    create: '/ehr',
    get: (id) => `/ehr/${id}`,
    update: (id) => `/ehr/${id}`,
    delete: (id) => `/ehr/${id}`,
    patient: (patientId) => `/ehr/patient/${patientId}`,
  },

  // Appointments
  appointments: {
    list: '/appointments',
    create: '/appointments',
    get: (id) => `/appointments/${id}`,
    update: (id) => `/appointments/${id}`,
    delete: (id) => `/appointments/${id}`,
    available: '/appointments/available',
  },

  // Dashboard
  dashboard: {
    stats: '/dashboard/stats',
    trends: '/dashboard/trends',
    alerts: '/dashboard/alerts',
    heatmap: '/dashboard/heatmap',
  },

  // Admin
  admin: {
    audit: '/admin/audit',
    users: '/admin/users',
    settings: '/admin/settings',
  },
};

// API helper functions
export const apiHelpers = {
  // Authentication helpers
  setAuthToken: (token) => {
    localStorage.setItem('authToken', token);
    api.defaults.headers.Authorization = `Bearer ${token}`;
  },

  removeAuthToken: () => {
    localStorage.removeItem('authToken');
    delete api.defaults.headers.Authorization;
  },

  // File upload helper
  uploadFile: async (url, file, onProgress) => {
    const formData = new FormData();
    formData.append('file', file);

    return api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });
  },

  // Retry helper for failed requests
  retryRequest: async (fn, maxRetries = 3, delay = 1000) => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  },
};

export default api;
