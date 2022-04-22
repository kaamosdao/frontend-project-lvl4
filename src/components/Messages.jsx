import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import {
  Button, InputGroup, FormControl, Form,
} from 'react-bootstrap';
import { addMessage } from '../slices/messageSlice.js';
import localStorageData from '../localStorageData.js';

const socket = io();

function Messages() {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.items);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const channel = channels.find((item) => item.id === currentChannelId);
  const messages = useSelector((state) => state.messages.items);

  const [inputValue, setInputValue] = useState('');
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = localStorageData.getUsername();
    const input = document.querySelector('.form-control');
    const button = document.querySelector('.form-button');
    // if (!socket.connected) {
    //   alert('Seems like connection troubles, please try later');
    //   return;
    // }
    input.setAttribute('disabled', true);
    button.setAttribute('disabled', true);
    socket.timeout(5000)
      .emit('newMessage', { username, message: inputValue, channelId: currentChannelId }, (err) => {
        if (err) {
          input.removeAttribute('disabled');
          button.removeAttribute('disabled');
        } else {
          input.removeAttribute('disabled');
          button.removeAttribute('disabled');
          setInputValue('');
        }
      });
  };
  useEffect(() => {
    socket.on('newMessage', ({
      username, message, id, channelId,
    }) => {
      dispatch(addMessage({
        username, message, id, channelId,
      }));
    });
  }, [socket]);

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
              placeholder="Text message..."
              onChange={handleChange}
              value={inputValue}
            />
            <Button type="submit" variant="outline-dark" id="button-addon1" className="form-button" disabled={!inputValue}>
              Send
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
}

export default Messages;
