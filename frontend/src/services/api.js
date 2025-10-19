import axios from 'axios';
import { logError, logWarning } from '../utils/rollbar';

const API_BASE_URL = '/api/v1';

// Создаем экземпляр axios с базовой конфигурацией
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерцептор для добавления токена к каждому запросу
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  console.log('API Request - Token found:', !!token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn('No JWT token found in localStorage');
    logWarning('API request without JWT token', {
      url: config.url,
      method: config.method
    });
  }
  return config;
});

// Интерцептор для обработки ошибок ответов
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Логируем ошибки API в Rollbar
    logError(error, {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });
    
    return Promise.reject(error);
  }
);

// API для каналов
export const channelsAPI = {
  // Получить все каналы
  getChannels: () => api.get('/channels'),
  
  // Создать новый канал
  createChannel: (name) => api.post('/channels', { name }),
  
  // Удалить канал
  deleteChannel: (id) => api.delete(`/channels/${id}`),
  
  // Переименовать канал
  renameChannel: (id, name) => api.patch(`/channels/${id}`, { name }),
};

// API для сообщений
export const messagesAPI = {
  // Получить сообщения канала
  getMessages: (channelId) => api.get(`/messages?channelId=${channelId}`),
  
  // Отправить новое сообщение через HTTP (fallback)
  sendMessage: (channelId, body) => api.post('/messages', { channelId, body }),
  
  // Удалить сообщение
  deleteMessage: (id) => api.delete(`/messages/${id}`),
};

export default api;
