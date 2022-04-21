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

  const [inputValue, setMInputValue] = useState('');
  const handleChange = (event) => {
    setMInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = localStorageData.getUsername();
    socket.emit('newMessage', { username, message: inputValue });
    setMInputValue('');
  };
  useEffect(() => {
    socket.on('newMessage', ({ username, message, id }) => {
      dispatch(addMessage({ username, message, id }));
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
        {messages.map((item) => (
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
            <Button type="submit" variant="outline-dark" id="button-addon1" disabled={!inputValue}>
              Send
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
}

export default Messages;
