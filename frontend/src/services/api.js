import axios from 'axios';

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
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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
