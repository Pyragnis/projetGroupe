import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://login.hikkary.com/users/login',
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Non connexion
      console.log('Non connecté');
      // Faire quelque chose pour gérer la non connexion
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
