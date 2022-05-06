import React from 'react';
import { useSelector } from 'react-redux';
import { Nav } from 'react-bootstrap';
import ChannelsItem from './ChannelsItem.jsx';

function Channelslist({ showModal }) {
  const channels = useSelector((state) => state.channels.items);

  return (
    <Nav as="ul" className="">
      {channels.map((item) => (
        <ChannelsItem key={item.id} showModal={showModal} item={item} />
      ))}
    </Nav>
  );
}

export default Channelslist;
