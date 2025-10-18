import React, { useEffect, useRef } from 'react';

const MessagesList = ({ messages, loading }) => {
  const messagesEndRef = useRef(null);

  // Автоскролл к последнему сообщению
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (loading) {
    return (
      <div className="messages-list">
        <div className="loading-messages">
          <div className="loading">Загрузка сообщений...</div>
        </div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="messages-list">
        <div className="no-messages">
          <p>Пока нет сообщений. Начните общение!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="messages-list">
      {messages.map(message => (
        <div key={message.id} className="message-item">
          <div className="message-header">
            <span className="message-author">{message.username}</span>
            <span className="message-time">
              {new Date(message.createdAt).toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
          <div className="message-body">
            {message.body}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesList;
