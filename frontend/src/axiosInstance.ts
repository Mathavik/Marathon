import axios from 'axios';

const backendHost = window.location.hostname === 'localhost' ? 'localhost' : '127.0.0.1';
const axiosInstance = axios.create({
  // Use the same hostname as the frontend origin when possible,
  // so the cookie remains same-site and is sent correctly.
  baseURL: `http://${backendHost}:8000/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});


axiosInstance.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem('token');
    if (token && req.headers) {
      req.headers['Authorization'] = `Bearer ${token}`;
    }
    return req;
  },
);
export default axiosInstance;
