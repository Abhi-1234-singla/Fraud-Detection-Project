import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const predictFraud = async (data) => {
  const response = await api.post('/predict', data);
  return response.data;
};

export const getTransactions = async (limit = 50) => {
  const response = await api.get(`/transactions?limit=${limit}`);
  return response.data;
};

export const getDashboardStats = async () => {
  const response = await api.get('/dashboard-stats');
  return response.data;
};

export default api;
