import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, SplitButton, Nav, Dropdown,
} from 'react-bootstrap';
import { setCurrentChannel } from '../slices/channelSlice.js';
import { setModalAction } from '../slices/modalSlice.js';

function Channels() {
  const channels = useSelector((state) => state.channels.items);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    event.preventDefault();
    const channelName = event.target.textContent.slice(2);
    const { id } = channels.find((item) => item.name === channelName);
    dispatch(setCurrentChannel(id));
  };
  const handleAddChannel = (event) => {
    event.preventDefault();
    dispatch(setModalAction('adding'));
  };
  const handleDeleteChannel = (event) => {
    event.preventDefault();
    dispatch(setModalAction('deleting'));
  };
  const handleRenameChannel = (event) => {
    event.preventDefault();
    dispatch(setModalAction('renaming'));
  };
  return (
    <>
      <div className="d-flex justify-content-between mb-2 ps-2">
        <span className="channels-title">Channels</span>
        <Button onClick={handleAddChannel} variant="outline-light" className="btn-addChannel" size="sm">+</Button>
      </div>
      <Nav as="ul">
        {channels.map((item) => {
          const isCurrentChannel = item.id === currentChannelId;
          const variantValue = isCurrentChannel ? 'secondary' : '';
          if (item.removable) {
            return (
              <Nav.Item as="li" key={item.id} className="w-100">
                <SplitButton onClick={handleClick} title={`# ${item.name}`} variant={variantValue} className="text-start rounded-0 w-100" id="segmented-button-dropdown-1">
                  <Dropdown.Item onClick={handleDeleteChannel} href="#" role="button">Delete</Dropdown.Item>
                  <Dropdown.Item onClick={handleRenameChannel} href="#" role="button">Rename</Dropdown.Item>
                </SplitButton>
              </Nav.Item>
            );
          }
          return (
            <Nav.Item onClick={handleClick} as="li" key={item.id} className="w-100">
              <Button variant={variantValue} className="text-start rounded-0 w-100">
                <span># </span>
                {item.name}
              </Button>
            </Nav.Item>
          );
        })}
      </Nav>
    </>
  );
}

export default Channels;
