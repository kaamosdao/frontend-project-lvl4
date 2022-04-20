import React from 'react';
import { useSelector } from 'react-redux';
import {
  Button, InputGroup, FormControl, Form,
} from 'react-bootstrap';

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
        <p>Messages</p>
      </div>
      <div className="form-message mt-auto">
        <Form noValidate>
          <InputGroup className="mb-3 border-0 p-0 ps-2">
            <FormControl
              aria-label="New message"
              aria-describedby="basic-addon1"
              placeholder="Text message..."
            />
            <Button variant="outline-dark" id="button-addon1">
              Send
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
}

export default Messages;
