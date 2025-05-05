import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (userData) => api.post('/users/register', userData),
  login: (credentials) => api.post('/users/login', credentials),
};

export const employeeAPI = {
  getAll: () => api.get('/employees'),
  getById: (id) => api.get(`/employees/${id}`),
  create: (employeeData) => {
    const formData = new FormData();
    
    formData.append('name', employeeData.name);
    formData.append('email', employeeData.email);
    formData.append('phone', employeeData.phone);
    formData.append('department', employeeData.department);
    formData.append('position', employeeData.position);
    formData.append('salary', Number(employeeData.salary));
    
    if (employeeData.profilePic) {
      formData.append('profilePicture', employeeData.profilePic);
    }

    return api.post('/employees', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  update: (id, employeeData) => {
    const formData = new FormData();
    
    formData.append('name', employeeData.name);
    formData.append('email', employeeData.email);
    formData.append('phone', employeeData.phone);
    formData.append('department', employeeData.department);
    formData.append('position', employeeData.position);
    formData.append('salary', Number(employeeData.salary));
    
    if (employeeData.profilePic) {
      formData.append('profilePicture', employeeData.profilePic);
    }

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