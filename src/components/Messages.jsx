import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Button, InputGroup, FormControl, Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAppContext from '../hooks/index.jsx';
import localStorageData from '../localStorageData.js';

function Messages() {
  const app = useAppContext();
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channels.items);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const channel = channels.find((item) => item.id === currentChannelId);
  const messages = useSelector((state) => state.messages.items);
  const inputEl = useRef(null);
  const buttonEl = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  useEffect(() => {
    inputEl.current.focus();
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const username = localStorageData.getUsername();
    // if (!socket.connected) {
    //   errorsSlice or something
    //   ('Seems like connection troubles, please try later');
    // }
    inputEl.current.setAttribute('disabled', true);
    buttonEl.current.setAttribute('disabled', true);
    app.socket.timeout(5000)
      .emit('newMessage', { username, message: inputValue, channelId: currentChannelId }, (err) => {
        if (err) {
          inputEl.current.removeAttribute('disabled');
          buttonEl.current.removeAttribute('disabled');
          inputEl.current.focus();
        } else {
          inputEl.current.removeAttribute('disabled');
          buttonEl.current.removeAttribute('disabled');
          setInputValue('');
        }
      });
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light">
        <p>
          #
          {channel && channel.name}
        </p>
      </div>
      <div className="messages-container overflow-auto">
        {messages.filter((item) => item.channelId === currentChannelId)
          .map((item) => (
            <div className="text-break" key={item.id}>
              <b>{item.username}</b>
              &#58;&nbsp;
              {item.message}
            </div>
          ))}
      </div>
      <div className="form-message mt-auto">
        <Form onSubmit={handleSubmit} noValidate>
          <InputGroup className="mb-3 border-0 p-0 ps-2">
            <FormControl
              aria-label="New message"
              aria-describedby="basic-addon1"
              placeholder={t('homePage.messages.inputPlaceholder')}
              onChange={handleChange}
              value={inputValue}
              autoFocus
              ref={inputEl}
            />
            <Button ref={buttonEl} type="submit" variant="outline-dark" id="button-addon1" className="form-button" disabled={!inputValue}>
              {t('homePage.messages.sendButton')}
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
}

export default Messages;
