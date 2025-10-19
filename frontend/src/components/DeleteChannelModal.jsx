import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { deleteChannel } from '../store/slices/channelsSlice';

const DeleteChannelModal = ({ isOpen, onClose, channelId, channelName }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await dispatch(deleteChannel(channelId));
      onClose();
    } catch (error) {
      console.error('Ошибка удаления канала:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{t('chat.deleteChannel')}</h3>
          <button className="modal-close" onClick={onClose}>
            <span>×</span>
          </button>
        </div>
        
        <div className="modal-body">
          <p>Вы уверены, что хотите удалить канал <strong>#{channelName}</strong>?</p>
          <p className="text-warning">Это действие нельзя отменить.</p>
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
            type="button"
            onClick={handleSubmit}
            className="btn btn-danger"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Удаление...' : 'Удалить'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteChannelModal;
