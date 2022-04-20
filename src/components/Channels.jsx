import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Nav } from 'react-bootstrap';
import { setCurrentChannel } from '../slices/channelSlice.js';

function Channels() {
  const channels = useSelector((state) => state.channels.items);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    const channelName = event.target.textContent.slice(1);
    const { id } = channels.find((item) => item.name === channelName);
    dispatch(setCurrentChannel(id));
  };
  return (
    <>
      <div className="d-flex">
        Channels
      </div>
      <Nav as="ul">
        {channels.map((item) => {
          if (item.id === currentChannelId) {
            return (
              <Nav.Item as="li" key={item.id} className="text-truncate w-100">
                <Button variant="secondary" className="text-start rounded-0 w-100">
                  <span className="me-1">#</span>
                  {item.name}
                </Button>
              </Nav.Item>
            );
          }
          return (
            <Nav.Item as="li" onClick={handleClick} key={item.id} className="text-truncate w-100">
              <Button variant="" className="text-start rounded-0 w-100">
                <span className="me-1">#</span>
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
