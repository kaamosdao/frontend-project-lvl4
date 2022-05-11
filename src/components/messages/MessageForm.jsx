import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../hooks/index.jsx';
import localStorageData from '../../localStorageData.js';
import showToast from '../../showToast.js';
import Input from './Input.jsx';

const toggleFormElementsState = (formEl, operation) => {
  if (operation === 'enable') {
    Array.from(formEl.current.elements).forEach((element) => {
      element.removeAttribute('disabled');
    });
  } else {
    Array.from(formEl.current.elements).forEach((element) => {
      element.setAttribute('disabled', true);
    });
  }
};

const setTimeoutReaction = (show, formEl, translate) => {
  const timeoutID = setTimeout(() => {
    show(translate('feedbackMessages.errors.network'), 'error');
    toggleFormElementsState(formEl, 'enable');
    formEl.current.querySelector('input').focus();
  }, 5000);
  return timeoutID;
};

const emitData = (formEl, socket, timeoutID, setInputValue, data) => {
  socket.emit('newMessage', data, (response) => {
    if (response.status === 'ok') {
      clearTimeout(timeoutID);
      toggleFormElementsState(formEl, 'enable');
      setInputValue('');
    }
  });
};

const createHandleSubmit = (elements) => (event) => {
  event.preventDefault();
  const {
    socket, formEl, showToast: show, t: translate, inputValue, currentChannelId, setInputValue,
  } = elements;
  const username = localStorageData.getUsername();
  if (!socket.connected) {
    showToast(translate('feedbackMessages.errors.network'), 'error');
    return;
  }
  const data = { username, message: inputValue, channelId: currentChannelId };
  toggleFormElementsState(formEl, 'disable');
  const timeoutID = setTimeoutReaction(show, formEl, translate);
  emitData(formEl, socket, timeoutID, setInputValue, data);
};

function MessageForm() {
  const { socket } = useApp();
  const { t } = useTranslation();
  const formEl = useRef(null);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const [inputValue, setInputValue] = useState('');
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const elementsForSubmit = {
    socket, formEl, showToast, t, inputValue, currentChannelId, setInputValue,
  };
  const handleSubmit = createHandleSubmit(elementsForSubmit);
  useEffect(() => {
    formEl.current.querySelector('input').focus();
  });

  return (
    <Form ref={formEl} onSubmit={handleSubmit} noValidate>
      <Input handleChange={handleChange} inputValue={inputValue} />
    </Form>
  );
}

export default MessageForm;
