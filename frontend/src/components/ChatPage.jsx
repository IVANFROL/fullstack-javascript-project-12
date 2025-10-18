import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../contexts/AuthContext';
import { fetchChannels, setCurrentChannel } from '../store/slices/channelsSlice';
import { fetchMessages, addMessage } from '../store/slices/messagesSlice';
import socketService from '../services/socket';
import ChannelsList from './ChannelsList';
import MessagesList from './MessagesList';
import MessageForm from './MessageForm';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { logout, user } = useAuth();
  const { channels, currentChannelId, loading: channelsLoading } = useSelector(state => state.channels);
  const { messagesByChannel, loading: messagesLoading } = useSelector(state => state.messages);
  const [connectionStatus, setConnectionStatus] = React.useState({ isConnected: false, reconnectAttempts: 0 });

  // Проверяем авторизацию
  if (!user || !user.token) {
    return (
      <div className="chat-page">
        <div className="loading-container">
          <div className="loading">Ошибка авторизации. Перенаправление на страницу входа...</div>
        </div>
      </div>
    );
  }

  // Загружаем каналы при монтировании компонента
  useEffect(() => {
    dispatch(fetchChannels());
    
    // Подключаемся к WebSocket
    socketService.connect();
    
    // Обновляем статус подключения
    const updateConnectionStatus = () => {
      setConnectionStatus(socketService.getConnectionStatus());
    };
    
    // Обработчик новых сообщений
    const handleNewMessage = (event) => {
      const message = event.detail;
      dispatch(addMessage({
        channelId: message.channelId,
        message: message
      }));
    };
    
    window.addEventListener('socket:newMessage', handleNewMessage);
    
    // Обновляем статус каждые 2 секунды
    const statusInterval = setInterval(updateConnectionStatus, 2000);
    
    return () => {
      window.removeEventListener('socket:newMessage', handleNewMessage);
      clearInterval(statusInterval);
      socketService.disconnect();
    };
  }, [dispatch]);

  // Загружаем сообщения при смене канала
  useEffect(() => {
    if (currentChannelId) {
      dispatch(fetchMessages(currentChannelId));
      
      // Подписываемся на канал через WebSocket
      socketService.joinChannel(currentChannelId);
    }
    
    return () => {
      if (currentChannelId) {
        socketService.leaveChannel(currentChannelId);
      }
    };
  }, [dispatch, currentChannelId]);

  const handleChannelSelect = (channelId) => {
    dispatch(setCurrentChannel(channelId));
  };

  const currentMessages = currentChannelId ? messagesByChannel[currentChannelId] || [] : [];

  if (channelsLoading) {
    return (
      <div className="chat-page">
        <div className="loading-container">
          <div className="loading">Загрузка...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="chat-header">
          <div className="chat-title">
            <h1>Hexlet Chat</h1>
            <div className={`connection-status ${connectionStatus.isConnected ? 'connected' : 'disconnected'}`}>
              {connectionStatus.isConnected ? '🟢 Подключено' : '🔴 Отключено'}
              {connectionStatus.reconnectAttempts > 0 && (
                <span className="reconnect-info">
                  (попытка {connectionStatus.reconnectAttempts}/5)
                </span>
              )}
            </div>
          </div>
          <button 
            className="logout-button"
            onClick={logout}
          >
            Выйти
          </button>
        </div>
        <div className="chat-content">
          <div className="channels-sidebar">
            <ChannelsList 
              channels={channels}
              currentChannelId={currentChannelId}
              onChannelSelect={handleChannelSelect}
            />
          </div>
          <div className="messages-area">
            {currentChannelId ? (
              <>
                <MessagesList 
                  messages={currentMessages}
                  loading={messagesLoading}
                />
                <MessageForm 
                  channelId={currentChannelId}
                />
              </>
            ) : (
              <div className="no-channel-selected">
                <p>Выберите канал для начала общения</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
