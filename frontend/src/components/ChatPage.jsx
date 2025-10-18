import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../contexts/AuthContext';
import { fetchChannels, setCurrentChannel } from '../store/slices/channelsSlice';
import { fetchMessages } from '../store/slices/messagesSlice';
import ChannelsList from './ChannelsList';
import MessagesList from './MessagesList';
import MessageForm from './MessageForm';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { logout } = useAuth();
  const { channels, currentChannelId, loading: channelsLoading } = useSelector(state => state.channels);
  const { messagesByChannel, loading: messagesLoading } = useSelector(state => state.messages);

  // Загружаем каналы при монтировании компонента
  useEffect(() => {
    dispatch(fetchChannels());
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
          <h1>Hexlet Chat</h1>
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
