import api from './api';

export const flagService = {
  // Get all flags
  getAllFlags: (params = {}) => {
    return api.get('/flags', { params });
  },

  // Get single flag
  getFlag: (id) => {
    return api.get(`/flags/${id}`);
  },

  // Create flag
  createFlag: (flagData) => {
    return api.post('/flags', flagData);
  },

  // Update flag
  updateFlag: (id, flagData) => {
    return api.put(`/flags/${id}`, flagData);
  },

  // Delete flag
  deleteFlag: (id) => {
    return api.delete(`/flags/${id}`);
  },

  // Toggle flag status
  toggleFlag: (id) => {
    return api.patch(`/flags/${id}/toggle`);
  },
};

export const authService = {
  // Register
  register: (data) => {
    return api.post('/auth/register', data);
  },

  // Login
  login: (email, password) => {
    return api.post('/auth/login', { email, password });
  },

  // Get current user
  getCurrentUser: () => {
    return api.get('/auth/me');
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
  },
};

export const auditService = {
  // Get audit logs
  getAuditLogs: (params = {}) => {
    return api.get('/audit', { params });
  },

  // Get audit stats
  getAuditStats: () => {
    return api.get('/audit/stats/summary');
  },
};
