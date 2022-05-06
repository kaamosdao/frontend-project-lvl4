import React from 'react';
import { useSelector } from 'react-redux';
import { useFilter } from '../../hooks/index.jsx';

function MessagesList() {
  const { filter } = useFilter();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const messages = useSelector((state) => state.messages.items);

  return (
    <>
      {messages.filter((item) => item.channelId === currentChannelId)
        .map((item) => (
          <div className="text-break" key={item.id}>
            <b>{item.username}</b>
            &#58;&nbsp;
            {filter.clean(item.message)}
          </div>
        ))}
    </>

  );
}

export default MessagesList;
