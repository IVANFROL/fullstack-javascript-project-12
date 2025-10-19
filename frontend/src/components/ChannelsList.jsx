import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddChannelModal from './AddChannelModal';
import RenameChannelModal from './RenameChannelModal';
import DeleteChannelModal from './DeleteChannelModal';

const ChannelsList = ({ channels, currentChannelId, onChannelSelect }) => {
  const { t } = useTranslation();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 });

  const handleAddChannel = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleChannelRightClick = (e, channel) => {
    e.preventDefault();
    if (channel.removable) {
      setSelectedChannel(channel);
      setContextMenu({
        show: true,
        x: e.clientX,
        y: e.clientY
      });
    }
  };

  const handleRenameChannel = () => {
    setContextMenu({ show: false, x: 0, y: 0 });
    setIsRenameModalOpen(true);
  };

  const handleDeleteChannel = () => {
    setContextMenu({ show: false, x: 0, y: 0 });
    setIsDeleteModalOpen(true);
  };

  const handleCloseRenameModal = () => {
    setIsRenameModalOpen(false);
    setSelectedChannel(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedChannel(null);
  };

  const handleClickOutside = () => {
    setContextMenu({ show: false, x: 0, y: 0 });
  };

  return (
    <div className="channels-list" onClick={handleClickOutside}>
      <div className="channels-header">
        <h3>{t('chat.channels')}</h3>
        <button 
          className="add-channel-btn" 
          title={t('chat.addChannel')}
          onClick={handleAddChannel}
        >
          <span>{t('chat.addChannelButton')}</span>
        </button>
      </div>
      <div className="channels-items">
        {channels.map(channel => (
          <div
            key={channel.id}
            className={`channel-item ${currentChannelId === channel.id ? 'active' : ''}`}
            onClick={() => onChannelSelect(channel.id)}
            onContextMenu={(e) => handleChannelRightClick(e, channel)}
          >
            <span className="channel-name"># {channel.name}</span>
            {!channel.removable && (
              <span className="channel-badge">системный</span>
            )}
          </div>
        ))}
      </div>
      
      {/* Контекстное меню */}
      {contextMenu.show && (
        <div 
          className="context-menu"
          style={{
            position: 'fixed',
            left: contextMenu.x,
            top: contextMenu.y,
            zIndex: 1001
          }}
        >
          <button onClick={handleRenameChannel} className="context-menu-item">
            {t('chat.renameChannel')}
          </button>
          <button onClick={handleDeleteChannel} className="context-menu-item danger">
            {t('chat.deleteChannel')}
          </button>
        </div>
      )}
      
      <AddChannelModal 
        isOpen={isAddModalOpen} 
        onClose={handleCloseAddModal} 
      />
      
      <RenameChannelModal 
        isOpen={isRenameModalOpen} 
        onClose={handleCloseRenameModal}
        channelId={selectedChannel?.id}
        currentName={selectedChannel?.name}
      />
      
      <DeleteChannelModal 
        isOpen={isDeleteModalOpen} 
        onClose={handleCloseDeleteModal}
        channelId={selectedChannel?.id}
        channelName={selectedChannel?.name}
      />
    </div>
  );
};

export default ChannelsList;
