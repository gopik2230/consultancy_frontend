// src/utils/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

// Helper function to get the token
const getToken = () => {
  return localStorage.getItem('token'); // or from cookies/context
};

// Axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Generic GET request
export const get = async (url, config = {}) => {
  const token = getToken();
  const headers = {
    ...config.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  return axiosInstance.get(url, { ...config, headers });
};

// Generic POST request
export const post = async (url, data, config = {}) => {
  const token = getToken();
  const headers = {
    ...config.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  return axiosInstance.post(url, data, { ...config, headers });
};

// Generic PUT request
export const put = async (url, data, config = {}) => {
  const token = getToken();
  const headers = {
    ...config.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  return axiosInstance.put(url, data, { ...config, headers });
};

// Generic DELETE request
export const del = async (url, config = {}) => {
  const token = getToken();
  const headers = {
    ...config.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  return axiosInstance.delete(url, { ...config, headers });
};

export default {
  get,
  post,
  put,
  delete: del, // Avoid using `delete` keyword
};