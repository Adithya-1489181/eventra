// API endpoint constants
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/api/auth/login',
  SIGNUP: '/api/signup',
  
  // Profile
  PROFILE: '/api/profile',
  PROFILE_TICKETS: '/api/profile/tickets',
  
  // Events
  EVENTS: '/api/events',
  EVENT_BY_ID: (id) => `/api/events/${id}`,
  CREATE_EVENT: '/api/createEvent',
  REGISTER_EVENT: (id) => `/api/events/${id}/register`,
  
  // Admin
  ADMIN_USERS: '/api/admin/allUsers',
  ADMIN_PROMOTE: '/api/admin/promoteUser',
};

// Event categories
export const EVENT_CATEGORIES = [
  { value: 'conference', label: 'Conference' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'seminar', label: 'Seminar' },
  { value: 'meetup', label: 'Meetup' },
  { value: 'networking', label: 'Networking' },
  { value: 'concert', label: 'Concert' },
  { value: 'sports', label: 'Sports' },
  { value: 'exhibition', label: 'Exhibition' },
  { value: 'other', label: 'Other' },
];

// User roles
export const USER_ROLES = {
  USER: 'user',
  ORGANISER: 'organiser',
  ADMIN: 'admin',
};

// Validation rules
export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MIN_PASSWORD_LENGTH: 6,
  MIN_EVENT_NAME_LENGTH: 3,
  MAX_EVENT_NAME_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 5000,
};

// Date formats
export const DATE_FORMATS = {
  SHORT: { month: 'short', day: 'numeric', year: 'numeric' },
  LONG: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
  TIME: { hour: '2-digit', minute: '2-digit' },
  DATETIME: { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric',
    hour: '2-digit', 
    minute: '2-digit' 
  },
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Please login to continue.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION: 'Please check your input and try again.',
};
