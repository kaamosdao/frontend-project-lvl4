import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Nav } from 'react-bootstrap';
import { setCurrentChannel } from '../../slices/channelSlice.js';
import DropdownButton from './DropdownButton.jsx';

function ChannelsItem({ channel }) {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const dispatch = useDispatch();
  const toggleCurrentChannel = () => {
    dispatch(setCurrentChannel(channel.id));
  };
  const variantValue = channel.id === currentChannelId ? 'secondary' : '';
  if (channel.removable) {
    return (
      <Nav.Item as="li" id={channel.id} className="w-100">
        <DropdownButton
          variantValue={variantValue}
          channel={channel}
        />
      </Nav.Item>
    );
  }
  return (
    <Nav.Item
      onClick={toggleCurrentChannel}
      as="li"
      id={channel.id}
      className="w-100"
    >
      <Button variant={variantValue} className="text-start rounded-0 w-100">
        <span># </span>
        {channel.name}
      </Button>
    </Nav.Item>
  );
}

export default ChannelsItem;
