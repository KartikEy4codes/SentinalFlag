import axios from "axios";

// ✅ Create API instance
const api = axios.create({
  baseURL: "http://localhost:5000/api", // change if needed
});

// 🔹 FLAG SERVICE
export const flagService = {
  getAllFlags: (params = {}) => api.get('/flags', { params }),
  getFlag: (id) => api.get(`/flags/${id}`),
  createFlag: (flagData) => api.post('/flags', flagData),
  updateFlag: (id, flagData) => api.put(`/flags/${id}`, flagData),
  deleteFlag: (id) => api.delete(`/flags/${id}`),
  toggleFlag: (id) => api.patch(`/flags/${id}/toggle`),
};

// 🔹 AUTH SERVICE
export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (email, password) => api.post('/auth/login', { email, password }),
  getCurrentUser: () => api.get('/auth/me'),
  logout: () => localStorage.removeItem('authToken'),
};

// 🔹 AUDIT SERVICE
export const auditService = {
  getAuditLogs: (params = {}) => api.get('/audit', { params }),
  getAuditStats: () => api.get('/audit/stats/summary'),
};