import axios from 'axios';

const API_BASE_URL = 'https://callygym-backend.onrender.com/api';
const api = axios.create({
  baseURL: API_BASE_URL,
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
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error Response:', error.response.data);
    } else if (error.request) {
      console.error('API Error - No Response:', error.request);
    } else {
      console.error('API Error - Request Setup:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;