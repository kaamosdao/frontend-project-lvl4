import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Nav } from 'react-bootstrap';
import { setCurrentChannel } from '../../slices/channelSlice.js';
import DropdownButton from './DropdownButton.jsx';

function ChannelsItem({ item }) {
  const channels = useSelector((state) => state.channels.items);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const dispatch = useDispatch();
  const toggleCurrentChannel = (event) => {
    const channelName = event.target.textContent.slice(2);
    const { id } = channels.find((channel) => channel.name === channelName);
    dispatch(setCurrentChannel(id));
  };
  const variantValue = item.id === currentChannelId ? 'secondary' : '';
  if (item.removable) {
    return (
      <Nav.Item as="li" key={item.id} className="w-100">
        <DropdownButton
          variantValue={variantValue}
          item={item}
          toggleCurrentChannel={toggleCurrentChannel}
        />
      </Nav.Item>
    );
  }
  return (
    <Nav.Item
      onClick={toggleCurrentChannel}
      as="li"
      key={item.id}
      className="w-100"
    >
      <Button variant={variantValue} className="text-start rounded-0 w-100">
        <span># </span>
        {item.name}
      </Button>
    </Nav.Item>
  );
}

export default ChannelsItem;
