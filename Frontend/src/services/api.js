import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const authAPI = {
  register: (userData) => api.post('/users/register', userData),
  login: (credentials) => api.post('/users/login', credentials),
};

// Employee API calls
export const employeeAPI = {
  getAll: () => api.get('/employees'),
  getById: (id) => api.get(`/employees/${id}`),
  create: (employeeData) => {
    const formData = new FormData();
    Object.keys(employeeData).forEach(key => {
      formData.append(key, employeeData[key]);
    });
    return api.post('/employees', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  update: (id, employeeData) => {
    const formData = new FormData();
    Object.keys(employeeData).forEach(key => {
      formData.append(key, employeeData[key]);
    });
    return api.put(`/employees/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  delete: (id) => api.delete(`/employees/${id}`),
  search: (query) => api.get(`/employees/search?q=${query}`),
};

export default api; 