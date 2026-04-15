import api from "../../../services/api";

const getAuthConfig = () => {
  const token = localStorage.getItem('authToken');
  if (!token || token === 'undefined' || token === 'null') {
    return {};
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// 🔹 FLAG SERVICE
export const flagService = {
  getAllFlags: (params = {}) => api.get('/flags', { params, ...getAuthConfig() }),
  getFlag: (id) => api.get(`/flags/${id}`, getAuthConfig()),
  createFlag: (flagData) => api.post('/flags', flagData, getAuthConfig()),
  updateFlag: (id, flagData) => api.put(`/flags/${id}`, flagData, getAuthConfig()),
  deleteFlag: (id) => api.delete(`/flags/${id}`, getAuthConfig()),
  toggleFlag: (id) => api.patch(`/flags/${id}/toggle`, null, getAuthConfig()),
};

// 🔹 AUTH SERVICE
export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (email, password) => api.post('/auth/login', { email, password }),
  getCurrentUser: () => api.get('/auth/me', getAuthConfig()),
  logout: () => Promise.resolve(), // Handled by AuthContext
};

// 🔹 AUDIT SERVICE
export const auditService = {
  getAuditLogs: (params = {}) => api.get('/audit', { params }),
  getAuditStats: () => api.get('/audit/stats/summary'),
};