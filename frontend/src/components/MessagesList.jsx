import React, { useEffect, useRef } from 'react';

const MessagesList = ({ messages, loading }) => {
  const messagesEndRef = useRef(null);

  // Автоскролл к последнему сообщению
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Функция для форматирования времени
  const formatMessageTime = (createdAt) => {
    // Если нет createdAt, показываем "Неизвестно"
    if (!createdAt) {
      return 'Неизвестно';
    }

    // Пробуем парсить дату
    const messageDate = new Date(createdAt);

    if (isNaN(messageDate.getTime())) {
      // Если дата невалидна, показываем "Неизвестно"
      return 'Неизвестно';
    }

    const now = new Date();
    
    // Разница в днях между сообщением и сейчас
    const diffTime = now.getTime() - messageDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Если сообщение сегодня (разница меньше 1 дня)
    if (diffDays === 0) {
      return messageDate.toLocaleTimeString('ru-RU', {
        timeZone: 'Europe/Moscow',
        hour: '2-digit',
        minute: '2-digit'
      });
    }

    // Если сообщение вчера
    if (diffDays === 1) {
      return `Вчера ${messageDate.toLocaleTimeString('ru-RU', {
        timeZone: 'Europe/Moscow',
        hour: '2-digit',
        minute: '2-digit'
      })}`;
    }

    // Для старых сообщений - показываем дату и время
    return messageDate.toLocaleString('ru-RU', {
      timeZone: 'Europe/Moscow',
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
              {formatMessageTime(message.createdAt)}
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
