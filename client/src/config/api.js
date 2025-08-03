// API Configuration using environment variables
const getBaseURL = () => {
  // Use environment variable if available, otherwise fallback to production
  const baseUrl = process.env.REACT_APP_API_BASE_URL || 'https://talkofcodebackend.onrender.com';
  // Always append /api/v1 to the base URL
  return `${baseUrl}/api/v1`;
};

const API_CONFIG = {
  development: {
    baseURL: getBaseURL(),
  },
  production: {
    baseURL: getBaseURL(),
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
