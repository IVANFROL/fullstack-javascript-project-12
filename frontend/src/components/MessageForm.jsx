import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../store/slices/messagesSlice';

const MessageForm = ({ channelId }) => {
  const [messageText, setMessageText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!messageText.trim() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await dispatch(sendMessage({
        channelId,
        body: messageText.trim()
      }));
      setMessageText('');
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="message-form">
      <form onSubmit={handleSubmit}>
        <div className="message-input-container">
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Введите сообщение..."
            className="message-input"
            rows="1"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={!messageText.trim() || isSubmitting}
            className="send-button"
          >
            {isSubmitting ? 'Отправка...' : 'Отправить'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
