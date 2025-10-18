import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const ChatPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="chat-header">
          <h1>Чат</h1>
          <button 
            className="logout-button"
            onClick={logout}
          >
            Выйти
          </button>
        </div>
        <div className="chat-content">
          <p>Добро пожаловать в чат!</p>
          <p>Здесь будет интерфейс чата.</p>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
