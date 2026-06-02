import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor to add JWT token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  signup: (name, email, password) => api.post('/auth/signup', { name, email, password }),
};

// Prediction & Analytics endpoints
export const fraudService = {
  predict: (data) => api.post('/predict', data),
  getHistory: () => api.get('/history'),
  getDashboardStats: () => api.get('/dashboard-stats'),
};

export default api;
