const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Base API call function with error handling
 */
async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

/**
 * Hero API Service
 */
export const heroAPI = {
  get: () => apiCall('/hero'),
  update: (data) => apiCall('/hero', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

/**
 * About API Service
 */
export const aboutAPI = {
  get: () => apiCall('/about'),
  update: (data) => apiCall('/about', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

/**
 * Projects API Service
 */
export const projectsAPI = {
  get: () => apiCall('/projects'),
  update: (data) => apiCall('/projects', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  add: (project) => apiCall('/projects', {
    method: 'POST',
    body: JSON.stringify(project),
  }),
  delete: (projectId) => apiCall(`/projects/${projectId}`, {
    method: 'DELETE',
  }),
};

/**
 * Blogs API Service
 */
export const blogsAPI = {
  get: () => apiCall('/blogs'),
  update: (data) => apiCall('/blogs', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  add: (blog) => apiCall('/blogs', {
    method: 'POST',
    body: JSON.stringify(blog),
  }),
  delete: (blogId) => apiCall(`/blogs/${blogId}`, {
    method: 'DELETE',
  }),
};

/**
 * Skills API Service
 */
export const skillsAPI = {
  get: () => apiCall('/skills'),
  update: (data) => apiCall('/skills', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

/**
 * Experience API Service
 */
export const experienceAPI = {
  get: () => apiCall('/experience'),
  update: (data) => apiCall('/experience', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

/**
 * Services API Service
 */
export const servicesAPI = {
  get: () => apiCall('/services'),
  update: (data) => apiCall('/services', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

/**
 * Testimonials API Service
 */
export const testimonialsAPI = {
  get: () => apiCall('/testimonials'),
  update: (data) => apiCall('/testimonials', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

/**
 * Footer API Service
 */
export const footerAPI = {
  get: () => apiCall('/footer'),
  update: (data) => apiCall('/footer', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

/**
 * Contact API Service
 */
export const contactAPI = {
  get: () => apiCall('/contact'),
  update: (data) => apiCall('/contact', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  submit: (formData) => apiCall('/contact/submit', {
    method: 'POST',
    body: JSON.stringify(formData),
  }),
};

/**
 * Upload API Service
 */
export const uploadAPI = {
  single: async (file, folder = '') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const response = await fetch(`${API_BASE_URL}/upload/single`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Upload failed');
    }

    return data;
  },

  multiple: async (files, folder = '') => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    formData.append('folder', folder);

    const response = await fetch(`${API_BASE_URL}/upload/multiple`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Upload failed');
    }

    return data;
  },

  delete: (path) => apiCall('/upload', {
    method: 'DELETE',
    body: JSON.stringify({ path }),
  }),

  getUrl: (path) => apiCall(`/upload/url?path=${encodeURIComponent(path)}`),
};

/**
 * Health check
 */
export const healthAPI = {
  check: () => apiCall('/health'),
};
