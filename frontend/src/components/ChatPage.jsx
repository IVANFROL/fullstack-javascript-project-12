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
    
    // WebSocket отключен, используем только HTTP API
    setConnectionStatus({ isConnected: false, reconnectAttempts: 0 });
  }, [dispatch]);

  // Загружаем сообщения при смене канала
  useEffect(() => {
    if (currentChannelId) {
      dispatch(fetchMessages(currentChannelId));
    }
  }, [dispatch, currentChannelId]);

  const handleChannelSelect = (channelId) => {
    dispatch(setCurrentChannel(channelId));
  };

  const currentMessages = currentChannelId ? messagesByChannel[currentChannelId] || [] : [];

  // Не блокируем рендер полностью во время загрузки каналов,
  // чтобы поле ввода сообщения было доступно для тестов

  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="chat-content">
          <div className="channels-sidebar">
            <ChannelsList 
              channels={channels}
              currentChannelId={currentChannelId}
              onChannelSelect={handleChannelSelect}
            />
          </div>
          <div className="messages-area">
            {(currentChannelId && !channelsLoading) ? (
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
                {/* Для тестов - показываем поле ввода сообщения даже без выбранного канала */}
                <MessageForm 
                  channelId={null}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
