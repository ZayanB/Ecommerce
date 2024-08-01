import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: false, // Include cookies for Laravel Sanctum
});

axiosInstance.interceptors.request.use(config => {
  // Add any custom headers or configurations
  return config;
}, error => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => {
  return response;
}, error => {
  // Handle errors globally
  return Promise.reject(error);
});

export default axiosInstance;