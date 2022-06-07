import React, { useRef, useEffect } from 'react';
import filter from 'leo-profanity';
import { useSelector } from 'react-redux';

function MessagesList() {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const messages = useSelector((state) => state.messages.items);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessagesList;
