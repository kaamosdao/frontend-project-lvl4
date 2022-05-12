import React from 'react';
import { useSelector } from 'react-redux';
import { useApp } from '../../hooks/index.jsx';

function MessagesList() {
  const { filter } = useApp();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const messages = useSelector((state) => state.messages.items);

  return (
    <div className="messages-container overflow-auto px-5">
      {messages.filter((item) => item.channelId === currentChannelId)
        .map((item) => (
          <div className="text-break mb-2" key={item.id}>
            <b>{item.username}</b>
            &#58;&nbsp;
            {filter.clean(item.message)}
          </div>
        ))}
    </div>
  );
}

export default MessagesList;
