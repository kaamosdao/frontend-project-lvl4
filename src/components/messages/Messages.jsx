import React from 'react';
import { useSelector } from 'react-redux';
import MessageForm from './MessageForm.jsx';
import MessagesList from './MessagesList.jsx';

function Messages() {
  const channels = useSelector((state) => state.channels.items);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const channel = channels.find((item) => item.id === currentChannelId);

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light">
        <p>
          #
          {channel && channel.name}
        </p>
      </div>
      <div className="messages-container overflow-auto">
        <MessagesList />
      </div>
      <div className="form-message mt-auto">
        <MessageForm />
      </div>
    </div>
  );
}

export default Messages;
