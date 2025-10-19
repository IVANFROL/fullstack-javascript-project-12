// import { io } from 'socket.io-client'; // WebSocket отключен

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000; // 1 секунда
  }

  connect() {
    // Отключаем WebSocket из-за проблем с CORS
    // Используем только HTTP запросы для отправки сообщений
    console.log('WebSocket отключен - используем только HTTP запросы');
    this.isConnected = false;
    return null;
  }

  setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket.id);
      this.isConnected = true;
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
      this.isConnected = false;
      
      if (reason === 'io server disconnect') {
        // Сервер принудительно отключил клиента
        this.handleReconnect();
      }
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      this.handleReconnect();
    });

    this.socket.on('newMessage', (message) => {
      console.log('New message received:', message);
      // Событие будет обработано в Redux middleware
      window.dispatchEvent(new CustomEvent('socket:newMessage', { detail: message }));
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  }

  handleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
    
    console.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
    
    setTimeout(() => {
      this.disconnect();
      this.connect();
    }, delay);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  // Подписаться на канал
  joinChannel(channelId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('joinChannel', channelId);
    }
  }

  // Покинуть канал
  leaveChannel(channelId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('leaveChannel', channelId);
    }
  }

  // Отправить сообщение
  // eslint-disable-next-line no-unused-vars
  sendMessage(_channelId, _message) {
    // WebSocket отключен, всегда возвращаем ошибку
    // Отправка сообщений будет происходить через HTTP API
    return Promise.reject(new Error('WebSocket отключен - используйте HTTP API'));
  }

  // Получить статус подключения
  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts
    };
  }
}

// Создаем единственный экземпляр
const socketService = new SocketService();

export default socketService;
