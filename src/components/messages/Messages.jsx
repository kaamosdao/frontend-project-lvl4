import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import MessageForm from './MessageForm.jsx';
import MessagesList from './MessagesList.jsx';

function Messages() {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channels.items);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const channel = channels.find((item) => item.id === currentChannelId);
  const messages = useSelector((state) => state.messages.items);
  const messagesAmount = messages.filter((item) => item.channelId === currentChannelId).length;
  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="p-0 mb-0">
          <b>
            #&nbsp;
            {channel && channel.name}
          </b>
        </p>
        <span className="text-muted">
          {t('homePage.messages.headerMessage', { count: messagesAmount })}
        </span>
      </div>
      <MessagesList />
      <MessageForm />
    </div>
  );
}

export default Messages;
