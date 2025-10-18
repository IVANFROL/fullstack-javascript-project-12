import React from 'react';

const ChannelsList = ({ channels, currentChannelId, onChannelSelect }) => {
  return (
    <div className="channels-list">
      <div className="channels-header">
        <h3>Каналы</h3>
        <button className="add-channel-btn" title="Добавить канал">
          <span>+</span>
        </button>
      </div>
      <div className="channels-items">
        {channels.map(channel => (
          <div
            key={channel.id}
            className={`channel-item ${currentChannelId === channel.id ? 'active' : ''}`}
            onClick={() => onChannelSelect(channel.id)}
          >
            <span className="channel-name"># {channel.name}</span>
            {!channel.removable && (
              <span className="channel-badge">системный</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelsList;
