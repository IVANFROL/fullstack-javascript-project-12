import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { renameChannel } from '../store/slices/channelsSlice';
import { cleanText } from '../utils/profanityFilter';

const RenameChannelModal = ({ isOpen, onClose, channelId, currentName }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [channelName, setChannelName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Устанавливаем текущее название канала при открытии модального окна
  useEffect(() => {
    if (isOpen && currentName) {
      setChannelName(currentName);
    }
  }, [isOpen, currentName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!channelName.trim() || isSubmitting || channelName.trim() === currentName) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Фильтруем нецензурные слова в названии канала
      const cleanedName = cleanText(channelName.trim());
      
      await dispatch(renameChannel({ id: channelId, name: cleanedName }));
      onClose();
    } catch (error) {
      console.error('Ошибка переименования канала:', error);
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

  const handleCancel = () => {
    setChannelName('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{t('chat.renameChannel')}</h3>
          <button className="modal-close" onClick={onClose}>
            <span>×</span>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <input
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('chat.channelName')}
              className="form-input"
              autoFocus
              disabled={isSubmitting}
              maxLength={20}
            />
          </div>
          
          <div className="modal-actions">
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-secondary"
              disabled={isSubmitting}
            >
              Отменить
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!channelName.trim() || isSubmitting || channelName.trim() === currentName}
            >
              {isSubmitting ? 'Переименование...' : t('chat.sendButton')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RenameChannelModal;
