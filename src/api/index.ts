import axios from 'axios';

import { BASE_URL } from '../shared/constants';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    'access_token',
  )}`;
  return config;
});

export default axiosInstance;
