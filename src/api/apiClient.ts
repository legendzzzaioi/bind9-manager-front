import axios from 'axios';
import router from '../router'; // 假设路由实例在 router/index.ts 文件中
import { message } from 'ant-design-vue';

const apiClient = axios.create({
  baseURL: '/api/v1',
});

// 请求拦截器
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// 响应拦截器
apiClient.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response && error.response.status === 401) {
    message.error('Unauthorized. Please login again.');
    localStorage.removeItem('token');
    router.push({name: 'Login'});
  }
  return Promise.reject(error);
});

export default apiClient;
