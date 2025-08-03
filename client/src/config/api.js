// API Configuration
const API_CONFIG = {
  development: {
    baseURL: 'https://talkofcodebackend.onrender.com/api/v1',
  },
  production: {
    baseURL: 'https://talkofcodebackend.onrender.com/api/v1',
  }
};

// Get current environment
const environment = process.env.NODE_ENV || 'development';

// Export the API base URL based on environment
export const API_BASE_URL = API_CONFIG[environment].baseURL;

// Helper function to get full API endpoint
export const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;

// Common API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    GOOGLE_LOGIN: '/auth/google-login',
    USER_AUTH: '/auth/userAuth',
    FORGOT_PASSWORD: '/auth/forgetPassword',
  },
  USER: {
    PROFILE: '/auth/Profile',
    UPDATE_PASSWORD: '/auth/ProfilePassword',
    UPDATE_LINKS: '/auth/ProfileLinks',
  }
};
