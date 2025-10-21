import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { sendMessage } from '../store/slices/messagesSlice';
import { cleanText } from '../utils/profanityFilter';

const MessageForm = ({ channelId }) => {
  const { t } = useTranslation();
  const [messageText, setMessageText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef(null);
  const dispatch = useDispatch();

  // Автоматическое изменение высоты textarea
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  };

  // Установка фокуса при монтировании компонента
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [channelId]);

  // Изменение высоты при изменении текста
  useEffect(() => {
    adjustTextareaHeight();
  }, [messageText]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!messageText.trim() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Фильтруем нецензурные слова в сообщении
      const cleanedText = cleanText(messageText.trim());
      
      await dispatch(sendMessage({
        channelId,
        body: cleanedText
      }));
      setMessageText('');
      // Сброс высоты после отправки
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
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

  const handleTextChange = (e) => {
    setMessageText(e.target.value);
  };

  return (
    <div className="message-form">
      <form onSubmit={handleSubmit}>
        <div className="message-input-container">
          <textarea
            ref={textareaRef}
            value={messageText}
            onChange={handleTextChange}
            onKeyPress={handleKeyPress}
            placeholder={t('chat.messagePlaceholder')}
            aria-label="Новое сообщение"
            className="message-input"
            rows="1"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={!messageText.trim() || isSubmitting}
            className="send-button"
          >
            {isSubmitting ? t('chat.sending') : t('chat.sendButton')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
