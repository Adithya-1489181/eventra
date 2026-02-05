// Date parsing and transformation utilities
export const parseEventDateTime = (dateField, timeField) => {
  // If we have both date and time as separate strings
  if (dateField && timeField && typeof dateField === 'string' && typeof timeField === 'string') {
    return `${dateField}T${timeField}`;
  }
  
  // If date field is already a Date object or ISO string
  if (dateField) {
    const date = new Date(dateField);
    if (!isNaN(date.getTime())) {
      return date.toISOString();
    }
  }
  
  return null;
};

// Transform backend event data to frontend format
export const transformEventData = (rawEvent) => {
  // Handle dates that might be in duration object or at root level
  const startDate = rawEvent.duration?.start_date || rawEvent.start_date || rawEvent.startDate;
  const startTime = rawEvent.duration?.start_time || rawEvent.start_time || rawEvent.startTime;
  const endDate = rawEvent.duration?.end_date || rawEvent.end_date || rawEvent.endDate;
  const endTime = rawEvent.duration?.end_time || rawEvent.end_time || rawEvent.endTime;
  
  // Properly handle isOpen as boolean (it might come as string or boolean)
  let isOpen = rawEvent.isOpen;
  if (typeof isOpen === 'string') {
    isOpen = isOpen === 'true';
  } else if (typeof isOpen !== 'boolean') {
    isOpen = false;
  }
  
  // Map category - if not in the standard list, mark as 'other'
  const validCategories = ['conference', 'workshop', 'seminar', 'meetup', 'networking', 'concert', 'sports', 'exhibition', 'other'];
  const category = rawEvent.event_type;
  const mappedCategory = validCategories.includes(category) ? category : 'other';
  
  const transformed = {
    eventId: rawEvent.event_id,
    eventName: rawEvent.event_name,
    description: rawEvent.event_details,
    location: rawEvent.location,
    startDate: parseEventDateTime(startDate, startTime),
    endDate: parseEventDateTime(endDate, endTime),
    capacity: rawEvent.capacity,
    category: mappedCategory,
    bannerImage: rawEvent.banner_image,
    organizerId: rawEvent.organisers_id || rawEvent.createdBy,
    isOpen: isOpen,
  };
  
  return transformed;
};

// Date formatting utilities
export const formatDate = (dateString, options = {}) => {
  if (!dateString) return 'Date not available';
  
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  const defaultOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  };
  return date.toLocaleDateString('en-US', defaultOptions);
};

export const formatTime = (dateString, options = {}) => {
  if (!dateString) return 'Time not available';
  
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    return 'Invalid time';
  }
  
  const defaultOptions = {
    hour: '2-digit',
    minute: '2-digit',
    ...options,
  };
  return date.toLocaleTimeString('en-US', defaultOptions);
};

export const formatDateTime = (dateString) => {
  return `${formatDate(dateString)} at ${formatTime(dateString)}`;
};

// String utilities
export const truncate = (str, length = 100) => {
  if (!str || str.length <= length) return str;
  return `${str.substring(0, length)}...`;
};

export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Validation utilities
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Error handling
export const getErrorMessage = (error) => {
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

// Local storage utilities
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch {
      return false;
    }
  },
};

// Array utilities
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const groupKey = item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});
};

export const sortBy = (array, key, order = 'asc') => {
  return [...array].sort((a, b) => {
    if (order === 'asc') {
      return a[key] > b[key] ? 1 : -1;
    }
    return a[key] < b[key] ? 1 : -1;
  });
};
